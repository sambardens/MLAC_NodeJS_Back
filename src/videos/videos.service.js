import * as path from "path";
import * as fs from "fs";
import * as uuid from "uuid";
import {ApiError} from "../errors/errors.api.js";
import download from "download";
import sharp from "sharp";

class VideosService {

  async saveVideoInDirectory(video, sizes) {
      if (!fs.existsSync(path.resolve('videos'))) {
          fs.mkdirSync(path.resolve('videos'));
      }

      const uniqueName = uuid.v4() + '.mp4';
      await video.mv(path.resolve('videos', uniqueName));

      return uniqueName;
  }

  async removeVideoFromDirectory(videoName) {
      const pathToVideo = path.resolve('videos', videoName);
      if (fs.existsSync(pathToVideo)) {
          fs.unlinkSync(pathToVideo);
      }
  }

  isVideo(videoName, formats) {
      for (const formatsKey in formats) {
          if (videoName?.endsWith(formats[formatsKey])) {
              return true;
          }
      }
      return false;
  }

  async saveVideoDb(existVideo, data) {
      const isCorrectVideo = data.video && this.isVideo(data.video.name, ['mp4', 'mov', 'avi']);
      const isCorrectUrlVideo = data.urlVideo && this.isUrlToVideo(data.urlVideo);

      if (existVideo && (isCorrectVideo || isCorrectUrlVideo)) {
          await this.removeVideoFromDirectory(existVideo);
      }
      if (isCorrectVideo) {
          const uniqueName = await this.saveVideoInDirectory(data.video, data.sizes);
          return uniqueName;
      }
      if (isCorrectUrlVideo) {
          const uniqueName = await this.downloadVideo(data.urlVideo, data.sizes);
          return uniqueName;
      }
  }

  async downloadVideo(url, sizes) {
    const uniqueName = uuid.v4() + '.mp4';

    await download(url, 'videos', {filename: uniqueName});

    if (sizes) {
        try {
            await sharp(`videos/${uniqueName}`)
                .resize({
                    width: sizes.width,
                    height: sizes.height
                })
                .toFile(`videos/thumb_${uniqueName}`);
        } catch (error) {
            console.log("Error resizing video:", error);
        }
    }

    return uniqueName;
}
}

export default new VideosService()