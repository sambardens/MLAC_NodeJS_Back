import scheme from "../../database/scheme.js";
import { DataTypes } from "sequelize";

export const BapsModel = scheme.define("baps", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING },
    artist_bio: { type: DataTypes.STRING },
    avatar: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING },
    designId: { type: DataTypes.STRING },
    mainGenereId: { type: DataTypes.INTEGER },
    secondGenereId: { type: DataTypes.INTEGER },
    facebookPixel: { type: DataTypes.STRING },
    spotifyId: { type: DataTypes.STRING },
    thumbnail: { type: DataTypes.STRING },
    napsterId: { type: DataTypes.STRING },
    deezerId: { type: DataTypes.STRING },
    appleMusicId: { type: DataTypes.STRING },
    soundCloudId: { type: DataTypes.STRING },
    spotifyUri: { type: DataTypes.STRING },
    country: { type: DataTypes.STRING },
    evearaBapId: { type: DataTypes.STRING },
    bapStatus: { type: DataTypes.ENUM("ACTIVE", "HIDDEN"), defaultValue: "ACTIVE" },
});
