import bapsService from "./baps.service.js";

class BapsController {
    async createBap(req, res, next) {
        try {
            const { name, role } = req.body;
            const { user } = req;
            const bap = await bapsService.createBap(name, role, user.id);
            return res.json({ bap });
        } catch (e) {
            next(e);
        }
    }

    async getAllBaps(req, res, next) {
        try {
            const { user } = req;
            const baps = await bapsService.getAllBaps(user.id);
            return res.json({ success: true, baps });
        } catch (e) {
            next(e);
        }
    }

    async getAllBapsAsAdmin(req, res, next) {
        try {
            const baps = await bapsService.getAllBapsAsAdmin();
            return res.json({ success: true, baps });
        } catch (e) {
            next(e);
        }
    }

    async getBapsDetailAsAdmin(req, res, next) {
        try {
            const { bapId } = req.params;
            const baps = await bapsService.getBap({ id: bapId });
            return res.json({ success: true, baps });
        } catch (e) {
            next(e);
        }
    }

    async editBap(req, res, next) {
        try {
            const { name, description, artist_bio, urlAvatar, designId, facebookPixel, spotifyId, removeAvatar, napsterId, deezerId, appleMusicId, spotifyUri, evearaBapId, country, soundCloudId } =
                req.body;
            const avatar = req?.files?.avatar;
            const { bapId } = req.params;
            const { user } = req;
            const bap = await bapsService.editBapById(bapId, user, {
                name,
                description,
                artist_bio,
                avatar,
                urlAvatar,
                designId,
                facebookPixel,
                spotifyId,
                removeAvatar,
                napsterId,
                deezerId,
                appleMusicId,
                spotifyUri,
                evearaBapId,
                country,
                soundCloudId,
            });
            return res.json({ success: true, bap });
        } catch (e) {
            next(e);
        }
    }

    async sendInviteBap(req, res, next) {
        try {
            const { bapId } = req.params;
            const { email, role } = req.body;
            const { user } = req;
            const notification = await bapsService.sendInviteBap(user, bapId, email, role);
            return res.json({ success: true, notification });
        } catch (e) {
            next(e);
        }
    }

    async setPermissionBap(req, res, next) {
        try {
            const { bapId } = req.params;
            const { userId } = req.body;
            const { user: authorRequest } = req;
            const member = await bapsService.setPermissionBap(authorRequest.id, userId, bapId);
            return res.json({ success: true, member });
        } catch (e) {
            next(e);
        }
    }

    async getMembers(req, res, next) {
        try {
            const { bapId } = req.params;
            const members = await bapsService.getMembers(bapId);
            return res.json({ success: true, members });
        } catch (e) {
            next(e);
        }
    }

    async getMembersAsAdmin(req, res, next) {
        try {
            const { bapId } = req.params;
            const members = await bapsService.getMembersAsAdmin(bapId);
            return res.json({ success: true, members });
        } catch (e) {
            next(e);
        }
    }

    async getReleasesAsAdmin(req, res, next) {
        try {
            const { bapId } = req.params;
            const baps = await bapsService.getReleasesAsAdmin(bapId);
            return res.json({ success: true, baps });
        } catch (e) {
            next(e);
        }
    }

    async getArtistFromSpotifyById(req, res, next) {
        try {
            const { artistId } = req.params;
            const artist = await bapsService.getArtistFromSpotifyById(artistId);
            return res.json({ success: true, artist });
        } catch (e) {
            next(e);
        }
    }

    async updateBapAsAdmin(req, res, next) {
        try {
            const { name, description, artist_bio, bapStatus, avatar, urlAvatar, designId, facebookPixel, spotifyId } = req.body;
            const { bapId } = req.params;
            const bap = await bapsService.updateBapAsAdmin(bapId, {
                name,
                description,
                artist_bio,
                bapStatus,
                avatar,
                urlAvatar,
                designId,
                facebookPixel,
                spotifyId,
            });
            return res.json({ success: true, bap });
        } catch (e) {
            next(e);
        }
    }

    async tryDeletionBap(req, res, next) {
        try {
            const { bapId } = req.params;
            const { user } = req;
            const { emailFutureCreator } = req.body;
            const token = await bapsService.tryDeletionBap(user.id, bapId, emailFutureCreator);
            return res.json({ success: true, token });
        } catch (e) {
            next(e);
        }
    }

    async confirmDeletionBap(req, res, next) {
        try {
            const { token } = req.query;
            const { user } = req;
            const result = await bapsService.confirmDeletionBap(user, token);
            return res.json({ success: true, result });
        } catch (e) {
            next(e);
        }
    }

    async acceptToBeFutureCreator(req, res, next) {
        try {
            const { token } = req.query;
            const { user } = req;
            const bap = await bapsService.acceptToBeFutureCreator(user, token);
            return res.json({ success: true, bap });
        } catch (e) {
            next(e);
        }
    }

    async deleteBaps(req, res, next) {
        try {
            const { bapId } = req.params;
            const releases = await bapsService.deleteBaps(bapId);
            return res.json({ success: true });
        } catch (e) {
            next(e);
        }
    }
}

export default new BapsController();
