import express from 'express'
import dotenv from 'dotenv'
import cors from "cors";
import scheme from './database/scheme.js'
import routes from "./src/routes.js";
import errorsMiddleware from "./src/errors/errors.middleware.js";
import cookieParser from "cookie-parser";
import fileUpload from 'express-fileupload'
import * as path from "path";
import {createDeletionBap, dropBap} from "./utils/drop-bap.js";
import futureCreatorBap from "./utils/future-creator-bap.js";
dotenv.config({path: `.env.${process.env.NODE_ENV}`})

const PORT = process.env.PORT
const app = express()

app.use(express.json())
app.use(cookieParser())
// app.use(cors({
//     origin: ['http://localhost:3000', 'https://major-labl.pixy.pro'],
//     'Access-Control-Allow-Credentials': true
// }))

app.use(
    cors({
        origin: [
            'http://localhost:3000',
            'https://mlac-react-front.vercel.app',
		    'https://mlac-react-admin.vercel.app',
        ],
        credentials: true,
    })
);

app.use(fileUpload({}))
app.use(express.static(path.resolve('images')))
app.use(express.static(path.resolve('videos')))
app.use('/apidoc', express.static('apidoc'))
app.use('/api', routes)
app.use(errorsMiddleware)

async function startApplication() {
    try {
        await scheme.authenticate()
        await scheme.sync()
        app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`))
    } catch (e) {
        console.log(e);
    }
}

startApplication()

