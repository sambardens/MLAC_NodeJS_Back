import scheme from '../../database/scheme.js'
import {DataTypes} from "sequelize";

export const MembersBapsModel = scheme.define('members_baps', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    isFullAdmin: {type: DataTypes.BOOLEAN, defaultValue: false},
    role: {type: DataTypes.STRING},
})