import incomesService from "../../incomes/incomes.service.js";
import np from "number-precision";
import tracksService from "../../tracks/tracks.service.js";
import shopsService from "../../shops/shops.service.js";
import { ApiError } from "../../errors/errors.api.js";
import splitsService from "../../splits/splits.service.js";
import usersService from "../../users/users.service.js";
import releaseService from "../../release/release.service.js";
import bapsService from "../../baps/baps.service.js";
import customersShopService from "../shop/customers-shop.service.js";
import customersLandingService from "../landing/customers-landing.service.js";
import landingService from "../../landing/landing.service.js";
import mailsService from "../../mails/mails.service.js";
import analyticsService from "../../analytics/analytics.service.js";
import { Op } from "sequelize";
import { SplitUsersModel } from "../../splits/split-users.model.js";
import tokensService from "../../tokens/tokens.service.js";
import { TracksModel } from "../../tracks/tracks.model.js";

class PaymentService {
    async payment(user, paymentEmail, purchaseLocationId, purchaseLocationTypeId, trackIds, tips, invoiceId) {
        const purchaseTrackIds = await this.getPurchaseTrackIds(purchaseLocationTypeId, user, trackIds, purchaseLocationId);

        await this.paymentToArtistsForTrack(purchaseTrackIds, user, paymentEmail, purchaseLocationId, purchaseLocationTypeId, tips, invoiceId);

        for (const releaseId in trackIds) {
            await this.clearBasket(user, purchaseLocationId, purchaseLocationTypeId, trackIds[releaseId]);
            await analyticsService.updateTotalPurchases(trackIds[releaseId], user.id);
        }
        console.log('trackIds: ', trackIds);
        let onlyTrackIds = { tracks: [] }
        for (const releaseId in trackIds) {
            const tracks = await TracksModel.findAll({ where: { id: { [Op.in]: trackIds[releaseId] } }, attributes: ['id', 'name'] });
            for (const track of tracks) {
                onlyTrackIds.tracks.push({ name: track.dataValues.name, trackId: track.dataValues.id })
            }
        }
        console.log('onlyTrackIds: ', onlyTrackIds);
        const { iat, exp, ...data } = user;
        
        const hashedTrackIds = tokensService.generateDownloadsToken(onlyTrackIds)
        const accessToken = tokensService.generateDownloadsAccessToken(data)
        console.log('hashedTrackIds: ', hashedTrackIds);
        console.log('accessToken: ', accessToken);

        const recipient = mailsService.initRecipientData([user.email], [{ name: user.firstName, token: hashedTrackIds, accessToken }]);

        await mailsService.sendMail(4888567, recipient);
    }

    async purchaseComplete(user, paymentEmail, releaseId = 0, bapId, price, purchaseLocationId, purchaseLocationTypeId, contractId, invoiceId, tips, trackIds) {
        return await incomesService.addNewTrade(
            {
                purchaseLocationId,
                price,
                userId: user.id,
                purchaseLocationTypeId,
                paymentEmail: paymentEmail,
                releaseId,
                bapId,
                contractId,
                invoiceId,
                tips,
            },
            trackIds
        );
    }

    async paymentToArtistsForTrack(trackIds, user, paymentEmail, purchaseLocationId, purchaseLocationTypeId, tips, invoiceId) {
        const trackIdsWithPrice = await this.checkDiscount(trackIds);
        let allTrackIds = [];
        let splits = [];
        let priceSum = 0;
        let split,
            track,
            bapId,
            release,
            income = 0;

        for (const releaseId in trackIdsWithPrice) {
            allTrackIds = allTrackIds.concat(trackIdsWithPrice[releaseId].trackIds);
            for (const releaseTrack of trackIdsWithPrice[releaseId].track) {
                const split = await splitsService.getSplit({ trackId: releaseTrack.trackId });
                if (split !== undefined) {
                    splits.push(split);
                }
            }
            if (!trackIdsWithPrice[releaseId].releasePrice)
                trackIdsWithPrice[releaseId].trackPriceSum = await tracksService.getTrackSumPrice({ where: { id: { [Op.in]: trackIdsWithPrice[releaseId].trackIds } } });

            priceSum += trackIdsWithPrice[releaseId].releasePrice || trackIdsWithPrice[releaseId].trackPriceSum;
            bapId = trackIdsWithPrice[releaseId].bapId;
            release = releaseId;
        }

        income = await this.purchaseComplete(user, paymentEmail, release, bapId, priceSum, purchaseLocationId, purchaseLocationTypeId, split?.contractId, invoiceId, tips, allTrackIds);
        splits = [];
        await incomesService.addPriceHistory(income.id, trackIdsWithPrice);
        let splitUsers = [];

        for (const releaseId in trackIdsWithPrice) {
            for (const releaseTrack of trackIdsWithPrice[releaseId].track) {
                track = await tracksService.getTrack({ id: releaseTrack.trackId });
                split = await splitsService.getSplit({ trackId: releaseTrack.trackId });
                splits.push(split);
                if (!split && !splits.some((split) => split?.trackId === track.dataValues.id)) {
                    await this.balanceAddition(releaseTrack, track.dataValues.releaseId, priceSum);
                } else {
                    splitUsers = await splitsService.getSplitUser(null, { splitId: split.splitId });
                    await this.balanceAddition(releaseTrack, track.dataValues.releaseId, priceSum, split, splitUsers);
                }
            }
        }
        if (tips) {
            for (const splitUser of splitUsers) {
                await usersService.giveBalance(np.divide(tips, splitUsers.length), { email: splitUser.email });
            }
        }
    }

    async balanceAddition(track, releaseId, priceSum, split, splitUsers) {
        const totalPercentFee = np.plus(process.env.MAJOR_LABL_FEE, process.env.PAYPAL_PERCENT_FEE, np.divide(process.env.PAYPAL_FIXED_FEE, priceSum));
        let priceTrack = np.minus(track.trackPrice, np.times(track.trackPrice, totalPercentFee)).toFixed(3);

        if (split) {
            for (const splitUser of splitUsers) {
                const sum = np.times(priceTrack, np.divide(+splitUser.ownership, 100)).toFixed(3);
                await usersService.giveBalance(sum, { email: splitUser.email });
            }
        } else {
            const release = await releaseService.getRelease({ id: releaseId });
            const bap = await bapsService.getBap({ id: release.bapId });
            await usersService.giveBalance(priceTrack, { id: bap.creatorId });
        }
    }

    async clearBasket(user, purchaseLocationId, purchaseLocationTypeId, trackIds) {
        if (purchaseLocationTypeId === 1) {
            for (const trackId of trackIds) {
                await customersShopService.removeTrackFromBasket(user, purchaseLocationId, trackId);
            }
        } else if (purchaseLocationTypeId === 2) {
            for (const trackId of trackIds) {
                await customersLandingService.removeTrackFromBasket(user, purchaseLocationId, trackId);
            }
        }
    }

    async getPurchaseTrackIds(purchaseLocationTypeId, user, trackIds, purchaseLocationId) {
        let basket;

        if (purchaseLocationTypeId === 1) {
            basket = await shopsService.getShopBasket({
                shopId: purchaseLocationId,
                userId: user.id,
            });
            if (!basket.length) throw ApiError.badRequest("Your basket is empty");
        }

        if (purchaseLocationTypeId === 2) {
            basket = await landingService.getLandingBasket({
                landingPageId: purchaseLocationId,
                userId: user.id,
            });
            if (!basket.length) throw ApiError.badRequest("Your basket is empty");
        }

        let purchaseTrackIds;

        for (const track in trackIds) {
            purchaseTrackIds = trackIds[track].filter((trackId) => basket.some((basketItem) => basketItem.trackId === trackId));

            if (!purchaseTrackIds?.length) throw ApiError.badRequest("You need to select the tracks that are in your cart.");

            trackIds[track] = purchaseTrackIds;
        }

        return trackIds;
    }

    async checkDiscount(trackIds) {
        const trackIdsWithPrice = Object.assign({}, trackIds);

        for (const releaseId in trackIds) {
            trackIdsWithPrice[releaseId] = {
                bapId: undefined,
                trackIds: trackIds[releaseId],
                track: trackIds[releaseId].map((trackIds) => ({
                    trackId: trackIds,
                    trackPrice: undefined,
                })),
                releasePrice: undefined,
                trackPriceSum: undefined,
            };
            const albumTrackCount = await tracksService.countTrackByReleaseId(releaseId);

            const release = await releaseService.getRelease({ id: releaseId });
            trackIdsWithPrice[releaseId].bapId = release?.bapId;

            for (const track of trackIdsWithPrice[releaseId].track) {
                const trackFromDB = await tracksService.getTrack({ id: track.trackId });

                if (trackIds[releaseId].length === albumTrackCount) {
                    trackIdsWithPrice[releaseId].releasePrice = release?.releasePrice;
                }

                track.trackPrice = trackFromDB.price;
            }
        }

        return trackIdsWithPrice;
    }
}

export default new PaymentService();
