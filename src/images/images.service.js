import * as path from "path";
import * as fs from "fs";
import * as uuid from "uuid";
import { ApiError } from "../errors/errors.api.js";
import download from "download";
import sharp from "sharp";

class ImagesService {
    async saveImageInDirectory(image, sizes) {
        if (!fs.existsSync(path.resolve("images"))) fs.mkdirSync(path.resolve("images"));
        const uniqueName = uuid.v4() + ".jpg";
        await image.mv(path.resolve("images", uniqueName));
        if (sizes) {
            try {
                await sharp(`images/${uniqueName}`)
                    .resize({
                        width: sizes.width,
                        height: sizes.height,
                    })
                    .toFile(`images/thumb_${uniqueName}`);
            } catch (error) {
                console.log("error: ", error);
            }
        }
        return uniqueName;
    }

    async removeImageFromDirectory(imageName, thumbImage) {
        const pathToImage = path.resolve("images", imageName);
        const pathToThumbImage = path.resolve("images", thumbImage);
        if (fs.existsSync(pathToImage)) fs.unlinkSync(pathToImage);
        if (fs.existsSync(pathToThumbImage)) fs.unlinkSync(pathToThumbImage);
    }

    isImage(imageName, formats) {
        for (const formatsKey in formats) {
            if (imageName?.endsWith(formats[formatsKey])) return true;
        }
        return false;
    }

    isUrlToImage(url) {
        return (
            url.startsWith("https://i.scdn.co/image") ||
            url.startsWith("https://export-download.canva.com") ||
            url.startsWith("https://mlacnodejsback-production.up.railway.app") ||
            url.startsWith("https://lh3.googleusercontent.com/") ||
            url.startsWith("https://platform-lookaside.fbsbx.com") ||
            url.startsWith("https://mosaic.scdn.co/") ||
            url.startsWith("https://lh3.googleusercontent.com/a") ||
            url.startsWith("https://e-cdns-images.dzcdn.net") ||
            url.startsWith("https://is1-ssl.mzstatic.com")
        );
    }

    async saveImageDb(existImage, data) {
        const isCorrectImage = data.image && this.isImage(data.image.name, ["jpg", "jpeg", "png"]);
        const isCorrectUrlImage = data.urlImage && this.isUrlToImage(data.urlImage);

        if (existImage && (isCorrectImage || isCorrectUrlImage)) {
            await this.removeImageFromDirectory(existImage, `thumb_${existImage}`);
        }
        if (isCorrectImage) {
            const uniqueName = await this.saveImageInDirectory(data.image, data.sizes);
            return uniqueName;
        }
        if (isCorrectUrlImage) {
            const images = await this.downloadImage(data.urlImage, data.sizes);
            return images.uniqueName;
        }
    }

    async downloadImage(url, sizes) {
        const uniqueName = uuid.v4() + ".jpg";
        const thumbImage = `thumb_${uniqueName}`;
        await download(url, "images", { filename: uniqueName });
        if (sizes) {
            try {
                await sharp(`images/${uniqueName}`)
                    .resize({
                        width: sizes.width,
                        height: sizes.height,
                    })
                    .toFile(`images/${thumbImage}`);
            } catch (error) {
                console.log("error: ", error);
            }
        }
        return { uniqueName, thumbImage };
    }
}

export default new ImagesService();
