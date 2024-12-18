import scheme from "../../database/scheme.js";
import { DataTypes, Sequelize } from "sequelize";

export const MailingModel = scheme.define("mailing_lists", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  bapId: { type: DataTypes.INTEGER },
  firstName: { type: DataTypes.STRING },
  lastName: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
});
