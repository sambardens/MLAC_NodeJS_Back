import scheme from "../../database/scheme.js";
import { DataTypes } from "sequelize";
import { BapsModel } from "../baps/baps.model.js";

export const ReleaseModel = scheme.define("release", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.STRING, allowNull: true },
    logo: { type: DataTypes.STRING },
    releaseSpotifyId: { type: DataTypes.STRING },
    auddSocialLink: { type: DataTypes.STRING },
    releaseDate: { type: DataTypes.DATE, defaultValue: null },
    label: { type: DataTypes.STRING(255), defaultValue: null },
    mainGenreId: { type: DataTypes.INTEGER, defaultValue: null },
    secondaryGenreId: { type: DataTypes.INTEGER, defaultValue: null },
    designId: { type: DataTypes.STRING },
    releasesStatus: { type: DataTypes.ENUM("ACTIVE", "HIDDEN"), defaultValue: "ACTIVE" },
    thumbnail: { type: DataTypes.STRING },
    totalTracks: { type: DataTypes.INTEGER, defaultValue: null },
    upc: { type: DataTypes.STRING, defaultValue: null },
    spotifyUri: { type: DataTypes.STRING, defaultValue: null },
    copyrights: { type: DataTypes.TEXT },
    releasePrice: { type: DataTypes.INTEGER, defaultValue: 0 },
    isReleaseByOriginalAudio: { type: DataTypes.BOOLEAN, defaultValue: false },
    allTracksStreamingLinks: { type: DataTypes.TEXT },
    evearaReleaseId: { type: DataTypes.STRING, defaultValue: null },
    evearaLabelId: { type: DataTypes.STRING, defaultValue: null },
    evearaReleaseLogo: { type: DataTypes.STRING, defaultValue: null },
    appleMusicReleasePriceId: { type: DataTypes.INTEGER, defaultValue: null },
    appleMusicTrackPriceId: { type: DataTypes.INTEGER, defaultValue: null },
    amazonReleasePriceId: { type: DataTypes.INTEGER, defaultValue: null },
    amazonTrackPriceId: { type: DataTypes.INTEGER, defaultValue: null },
    evearaGenreIds: { type: DataTypes.STRING, defaultValue: null },
    distributeDate: { type: DataTypes.DATE, defaultValue: null },
    subGenresIds: {
        type: DataTypes.STRING,
        defaultValue: null,
        get() {
            if (!this.getDataValue("subGenresIds")) return null;
            return this.getDataValue("subGenresIds").split(";");
        },
        set(val) {
            this.setDataValue("subGenresIds", val.join(";"));
        },
    },
});

BapsModel.hasMany(ReleaseModel, { onDelete: "CASCADE" });
ReleaseModel.belongsTo(BapsModel);
