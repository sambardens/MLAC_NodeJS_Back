import { DataTypes } from "sequelize"
import scheme from "../../database/scheme.js"
import { UsersModel } from "../users/users.model.js"
import { TracksModel } from "../tracks/tracks.model.js"
import { ReleaseModel } from "../release/release.model.js"
import { BapsModel } from "../baps/baps.model.js"

export const DownloadsModel = scheme.define('downloads', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    userId: {type: DataTypes.INTEGER, defaultValue: null},
    trackId: {type: DataTypes.INTEGER, defaultValue: null},
    releaseId: {type: DataTypes.INTEGER, defaultValue: null},
    bapId: {type: DataTypes.INTEGER, defaultValue: null},
})

UsersModel.hasMany(DownloadsModel)
DownloadsModel.belongsTo(UsersModel)

TracksModel.hasMany(DownloadsModel)
DownloadsModel.belongsTo(TracksModel)

ReleaseModel.hasMany(DownloadsModel)
DownloadsModel.belongsTo(ReleaseModel)

BapsModel.hasMany(DownloadsModel)
DownloadsModel.belongsTo(BapsModel)