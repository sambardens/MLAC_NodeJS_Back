import { featureArtistsModel } from "./feature-artists.model.js";
import { ApiError } from "../errors/errors.api.js";
import tracksService from "../tracks/tracks.service.js";
import scheme from "../../database/scheme.js";
import { QueryTypes } from "sequelize";
import { BapsModel } from "../baps/baps.model.js";
import imagesService from "../images/images.service.js";

class featureArtistsService {
    async getFeatureArtist(options) {
        const featureArtist = await featureArtistsModel.findOne({ where: options });
        return featureArtist;
    }

    async getFeatureArtists(options) {
        let where = "";
        for (const optionsKey in options) {
            if (options[optionsKey]) where += `${optionsKey} = ${options[optionsKey]} && `;
        }

        const index = where.lastIndexOf("&&");
        where = where.substring(0, index - 1);

        const featureArtists = await scheme.query(
            `
            SELECT feature_artists.id as id, feature_artists.name as name, feature_artists.avatar as avatar, feature_artists.spotifyId as spotifyId, 
            feature_artists.onMajorLabl as onMajorLabl, feature_artists.avatarMin as avatarMin, feature_artists.soundCloudId as soundCloudId, 
            feature_artists.appleMusicId as appleMusicId, feature_artists.country as country
            FROM feature_artists 
            LEFT JOIN tracks ON feature_artists.trackId = tracks.id
            WHERE ${where}
        `,
            {
                raw: true,
                type: QueryTypes.SELECT,
            }
        );

        return featureArtists;
    }

    async addFeatureArtist(user, trackId, name, spotifyId, avatar, soundCloudId, appleMusicId, country) {
        const track = await tracksService.getTrack({ id: trackId });
        if (!track) throw ApiError.badRequest("The track doesn't exist");

        const isExistBap = await BapsModel.findOne({ where: { spotifyId } });
        const onMajorLabl = isExistBap ? true : false;
        let images;
        let featureArtist;

        if (avatar) {
            images = await imagesService.downloadImage(avatar, { width: 80, heigth: 80 });
            featureArtist = await featureArtistsModel.create({ trackId, name, spotifyId, avatar, onMajorLabl, avatarMin: images.thumbImage, soundCloudId, appleMusicId, country });
            featureArtist.dataValues.avatarMin = images.thumbImage;
        } else {
            featureArtist = await featureArtistsModel.create({ trackId, name, spotifyId, avatar, onMajorLabl, soundCloudId, appleMusicId, country });
        }
        featureArtist.dataValues.onMajorLabl = onMajorLabl;

        return featureArtist;
    }

    async editFeatureArtist(user, artistId, soundCloudId, appleMusicId, country) {
        if (!artistId) throw ApiError.badRequest("must be a query param");

        const artist = await featureArtistsModel.findOne({ where: { id: artistId } });
        if (!artist) throw ApiError.badRequest("The artist doesn't exist");

        artist.soundCloudId = soundCloudId
        artist.appleMusicId = appleMusicId
        artist.country = country
        
        await artist.save()

        return artist;
    }

    async removeFeatureArtistFromTrack(authorRequest, trackId, id) {
        if (!trackId || !id) throw ApiError.badRequest("must enter trackId and artistId to remove");

        await featureArtistsModel.destroy({ where: { trackId, id } });
    }
}

export default new featureArtistsService();
