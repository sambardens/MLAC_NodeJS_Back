import scheme from "../../database/scheme.js";
import { DataTypes } from "sequelize";
import { TracksModel } from "../tracks/tracks.model.js";

export const featureArtistsModel = scheme.define("feature_artists", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING },
    spotifyId: { type: DataTypes.STRING },
    avatar: { type: DataTypes.STRING },
    onMajorLabl: { type: DataTypes.BOOLEAN },
    avatarMin: { type: DataTypes.STRING },
    soundCloudId: { type: DataTypes.STRING },
    appleMusicId: { type: DataTypes.STRING },
    country: { type: DataTypes.STRING },
});

TracksModel.hasMany(featureArtistsModel, { foreignKey: "trackId" });
featureArtistsModel.belongsTo(TracksModel);
