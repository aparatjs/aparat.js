import {
  BaseApiUrlTypes,
  ErrorCodes,
  VideoQuality
} from "../types/enums";
import {
  createWriteStream,
  unlink
} from "fs";
import { ApiVideoSearchV1Response } from "../types/api/api.v1.video";
import { GetVideo, SearchVideo } from "../types/interfaces";
import { ApiVideoHashResponse } from "../types/api/api.base.video";
import { ApiService } from "../core/api";
import { Endpoints } from "../utils/endpoints";
import { APIError } from "../utils/error-handler";
import * as https from "https";

export class VideoService {
  constructor(private api: ApiService) { }

  /**
   * Searches for videos matching a query string.
   * It filters and maps the API response to an array of SearchVideo objects.
   *
   * @param query - The search term used to find videos.
   * @returns A Promise that resolves to an array of SearchVideo objects.
   */
  public async search(query: string): Promise<Array<SearchVideo>> {
    try {
      const data: ApiVideoSearchV1Response = await this.api.fetch(
        BaseApiUrlTypes.ApiV1,
        Endpoints.V1.SearchVideo(query)
      );

      // Filter items to include only videos and map them to the SearchVideo interface
      const results: Array<SearchVideo> = data.included
        .filter(item => item.type === "Video")
        .map(item => {
          return {
            id: parseInt(item.attributes.id),
            hash_id: item.attributes.uid,
            title: item.attributes.title,
            description: item.attributes.description,
            url: `https://www.aparat.com/v/${item.attributes.uid}`,
            views: parseInt(item.attributes.visit_cnt_int),
            likes: parseInt(item.attributes.like_cnt),
            duration: parseInt(item.attributes.duration),
            thumbnail: item.attributes.big_poster,
            preview: item.attributes.preview_src,
            frame: item.attributes.frame,
            publish_at: new Date(item.attributes.sdate_timediff),
            uploader: {
              id: item.attributes.userid,
              name: item.attributes.sender_name,
              username: item.attributes.username,
              icon: item.attributes.profilePhoto,
              is_official: item.attributes.official === "yes" ? true : false
            }
          }
        });

      return results;
    } catch (error) {
      // Throw a custom APIError if the search fails
      throw new APIError(
        ErrorCodes.SEARCH_ERROR,
        "Faild to search the video"
      );
    }
  }

  /**
   * Retrieves detailed information about a video by its hash.
   *
   * @param hash - The unique hash identifier for the video.
   * @returns A Promise that resolves to a GetVideo object containing video details.
   */
  public async get(hash: string): Promise<GetVideo> {
    try {
      const data: ApiVideoHashResponse = await this.api.fetch(
        BaseApiUrlTypes.ApiBase,
        Endpoints.Base.GetVideo(hash)
      );

      // Construct and return a GetVideo object based on API response data
      return {
        id: parseInt(data.video.id),
        hash_id: data.video.uid,
        title: data.video.title,
        duration: data.video.duration,
        views: data.video.visit_cnt,
        thumbnail: data.video.big_poster,
        publish_at: new Date(data.video.sdate_timediff),
        description: data.video.description,
        frame: data.video.frame,
        likes: data.video.like_cnt,
        tags: data.video.tags,
        url: `https://www.aparat.com/v/${data.video.uid}`,
        uploader: {
          id: data.video.userid,
          name: data.video.sender_name,
          username: data.video.username,
          icon: data.video.profilePhoto
        },
        is_download_able: data.video.can_download,
        download_link: data.video.file_link,
        download_links: data.video.file_link_all.map(a => ({ quality: a.profile, url: a.urls[0] }))
      }
    } catch (error) {
      // If fetching video details fails, wrap the error in an APIError
      throw new APIError(
        ErrorCodes.SEARCH_ERROR,
        "Faild to search the video"
      );
    }
  }

  /**
   * Downloads a video file by streaming it from a provided download URL.
   * It checks for download availability and selects the appropriate quality.
   *
   * @param hash - The unique hash of the video.
   * @param quality - The desired video quality (default is P720).
   * @param outputPath - The file path prefix where the video will be saved.
   * @returns A Promise that resolves when the video is successfully downloaded.
   */
  public async download(
    hash: string,
    quality: VideoQuality = VideoQuality.P720,
    outputPath: string = "./video.mp4"
  ): Promise<void> {
    try {
      const video: GetVideo = await this.get(hash);

      // Verify if the video is available for download
      if (!video.is_download_able)
        throw new APIError(
          ErrorCodes.DOWNLOAD_ERROR,
          "This video is not download able!"
        );

      // Select the download link matching the specified quality or fallback to the first available link
      const downloadLinkObj =
        video.download_links.find(link => link.quality === quality) ||
        { quality: "unknown quality", url: video.download_link };

      if (!downloadLinkObj) {
        throw new APIError(
          ErrorCodes.DOWNLOAD_ERROR,
          "No download link to this video"
        );
      }

      // Stream the video file and save it locally
      await new Promise<void>((resolve, reject) => {
        const file = createWriteStream(outputPath);
        https
          .get(downloadLinkObj.url, (response) => {
            response.pipe(file);
            file.on("finish", () => {
              file.close();
              resolve();
            });
          })
          .on("error", (err) => {
            // Remove incomplete file on error and reject the promise with an APIError
            unlink(outputPath, () => { });
            reject(new APIError(ErrorCodes.DOWNLOAD_ERROR, err.message));
          });
      });
    } catch (error) {
      // Wrap any download-related errors into an APIError and throw
      throw new APIError(
        ErrorCodes.DOWNLOAD_ERROR,
        error instanceof Error ? error.message : "Faild to download the video!"
      );
    }
  }
}
/**
 * @copyright
 * Code by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * Developed for Persian Caesar | https://github.com/Persian-Caesar | https://dsc.gg/persian-caesar
 *
 * If you encounter any issues or need assistance with this code,
 * please make sure to credit "Persian Caesar" in your documentation or communications.
 */