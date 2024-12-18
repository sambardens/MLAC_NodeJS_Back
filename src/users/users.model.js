import scheme from "../../database/scheme.js";
import { DataTypes, ENUM } from "sequelize";
import { TokensModel } from "../tokens/tokens.model.js";
import { BapsModel } from "../baps/baps.model.js";
import { MembersBapsModel } from "../baps/members-baps.model.js";
import { MailingModel } from "../mailing/mailing.model.js";

export const UsersModel = scheme.define("users", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    // username: {type: DataTypes.STRING},
    firstName: { type: DataTypes.STRING },
    lastName: { type: DataTypes.STRING },
    // full_name: {type: DataTypes.STRING, defaultValue: ''},
    email: { type: DataTypes.STRING, unique: true, require: true, allowNull: false },
    balance: { type: DataTypes.DECIMAL(10, 3), defaultValue: 0, allowNull: false },
    provider: { type: DataTypes.STRING, defaultValue: "email" },
    avatar: { type: DataTypes.STRING },
    address: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING, allowNull: false },
    isEmailConfirmed: { type: DataTypes.BOOLEAN, defaultValue: false },
    paymentEmail: { type: DataTypes.STRING },
    uuidEveara: { type: DataTypes.STRING },
    isSubscribedOnMailing: { type: DataTypes.BOOLEAN },
    accountStatus: { type: DataTypes.ENUM("ACTIVE", "BANNED"), defaultValue: "ACTIVE" },
    thumbnail: { type: DataTypes.STRING },
    newEmail: { type: DataTypes.STRING },
    number: { type: DataTypes.STRING },
    streetAddressOne: { type: DataTypes.STRING },
    streetAddressTwo: { type: DataTypes.STRING },
    city: { type: DataTypes.STRING },
    regionState: { type: DataTypes.STRING },
    postCodeZipCode: { type: DataTypes.STRING },
    country: { type: DataTypes.STRING },
    evearaSubscriptionId: { type: DataTypes.STRING },
    totalAuddRequests: { type: DataTypes.INTEGER },
    totalWeightTracks: { type: DataTypes.INTEGER },
    totalInvites: { type: DataTypes.INTEGER },
    isNew: { type: DataTypes.BOOLEAN, defaultValue: true }
});

UsersModel.hasOne(TokensModel, { onDelete: "CASCADE" });
TokensModel.belongsTo(UsersModel);

UsersModel.hasMany(BapsModel, { foreignKey: "creatorId" });
BapsModel.belongsTo(UsersModel, { foreignKey: "creatorId" });

// UsersModel.belongsToMany(BapsModel, {through: MembersBapsModel, foreignKeyConstraint: false})
// BapsModel.belongsToMany(UsersModel, {through: MembersBapsModel, foreignKeyConstraint: false})

UsersModel.hasMany(MembersBapsModel, { onDelete: "CASCADE" });
MembersBapsModel.belongsTo(UsersModel);

BapsModel.hasMany(MembersBapsModel, { onDelete: "CASCADE" });
MembersBapsModel.belongsTo(BapsModel);

UsersModel.hasMany(MailingModel, { foreignKey: "userId" });
MailingModel.belongsTo(UsersModel);
