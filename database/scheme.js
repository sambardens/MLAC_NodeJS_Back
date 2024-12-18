import {Sequelize} from 'sequelize'
import dotenv from "dotenv";
dotenv.config({path: `.env.${process.env.NODE_ENV || 'development'}`})

export default new Sequelize(
    process.env.MYSQL_NAME,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
        dialect: process.env.MYSQL_DIALECT,
        port: process.env.MYSQL_PORT,
        host: process.env.MYSQL_HOST
    }
)