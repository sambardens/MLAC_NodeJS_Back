import scheme from "../../database/scheme.js";
import {DataTypes} from "sequelize";
import {ReleaseModel} from "../release/release.model.js";
import { BapsModel } from "../baps/baps.model.js";

export const TracksModel = scheme.define('tracks', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    uniqueName: { type: DataTypes.STRING, allowNull: false },
    originalName: { type: DataTypes.STRING },
    type: { type: DataTypes.STRING },
    price: {type: DataTypes.DECIMAL(10,3)},
    info: {type: DataTypes.TEXT},
    position: {type: DataTypes.INTEGER},
    socialLinks: { type: DataTypes.STRING },
    composers: { type: DataTypes.STRING },
    duration: { type: DataTypes.INTEGER },
    discNumber: { type: DataTypes.INTEGER },
    isrc: { type: DataTypes.STRING },
    lyrics: { type: DataTypes.STRING, defaultValue: null },
    spotifyId: { type: DataTypes.STRING },
    spotifyPreviewUrl: { type: DataTypes.STRING },
    timeCode: { type: DataTypes.STRING },
    albumSpotifyId: { type: DataTypes.STRING },
    explicit: { type: DataTypes.BOOLEAN, defaultValue: false },
    spotifyLink: { type: DataTypes.STRING },
    evearaTrackId: { type: DataTypes.STRING },
    evearaPriceId: { type: DataTypes.INTEGER },
    evearaPreviewDuration: { type: DataTypes.INTEGER, defaultValue: 15 },
    evearaPreviewStartAt: { type: DataTypes.INTEGER, defaultValue: 15 }
})

ReleaseModel.hasMany(TracksModel)
TracksModel.belongsTo(ReleaseModel)

BapsModel.hasMany(TracksModel)
TracksModel.belongsTo(BapsModel)