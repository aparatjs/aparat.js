// src/core/events.ts
import { EventEmitter } from "events";
var AparatEventEmitter = class extends EventEmitter {
  // Injects an instance of UserService to check streaming status
  constructor(userService) {
    super();
    this.userService = userService;
  }
  // Stores active stream check intervals for each user
  activeListeners = /* @__PURE__ */ new Map();
  /**
   * Starts a periodic check to see if a user is live streaming.
   * It checks immediately and then at every specified interval.
   * Emits a "live_start" event if the user is streaming.
   *
   * @param username - The username to monitor for live streams.
   * @param interval - Time in milliseconds between checks (default: 30000ms).
   */
  startStreamCheck(username, interval = 3e4) {
    const check = async () => {
      try {
        const isLive = await this.userService.isStream(username);
        if (isLive) {
          const streamProfile = await this.userService.getStreamProfile(username);
          this.emit("live_start", streamProfile);
        }
      } catch (error) {
        this.emit("error", error);
      }
    };
    const intervalId = setInterval(check, interval);
    this.activeListeners.set(username, intervalId);
    check();
  }
  /**
   * Stops the periodic live stream check for a specified user.
   *
   * @param username - The username whose live stream check should be stopped.
   */
  stopStreamCheck(username) {
    const intervalId = this.activeListeners.get(username);
    if (intervalId) {
      clearInterval(intervalId);
      this.activeListeners.delete(username);
    }
  }
};

// src/types/enums.ts
var ErrorCodes = /* @__PURE__ */ ((ErrorCodes2) => {
  ErrorCodes2[ErrorCodes2["NETWORK_ERROR"] = 1e3] = "NETWORK_ERROR";
  ErrorCodes2[ErrorCodes2["HTTP_ERROR"] = 1001] = "HTTP_ERROR";
  ErrorCodes2[ErrorCodes2["USER_NOT_FOUND"] = 2001] = "USER_NOT_FOUND";
  ErrorCodes2[ErrorCodes2["VIDEO_NOT_FOUND"] = 3001] = "VIDEO_NOT_FOUND";
  ErrorCodes2[ErrorCodes2["RATE_LIMIT_EXCEEDED"] = 4001] = "RATE_LIMIT_EXCEEDED";
  ErrorCodes2[ErrorCodes2["AUTH_FAILED"] = 5001] = "AUTH_FAILED";
  ErrorCodes2[ErrorCodes2["WEBHOOK_ERROR"] = 6001] = "WEBHOOK_ERROR";
  ErrorCodes2[ErrorCodes2["SEARCH_ERROR"] = 7001] = "SEARCH_ERROR";
  ErrorCodes2[ErrorCodes2["DOWNLOAD_ERROR"] = 8001] = "DOWNLOAD_ERROR";
  return ErrorCodes2;
})(ErrorCodes || {});
var BaseApiUrlTypes = /* @__PURE__ */ ((BaseApiUrlTypes3) => {
  BaseApiUrlTypes3["ApiV1"] = "API_V1_URL";
  BaseApiUrlTypes3["ApiV2"] = "API_V2_URL";
  BaseApiUrlTypes3["ApiBase"] = "API_BASE_URL";
  return BaseApiUrlTypes3;
})(BaseApiUrlTypes || {});
var VideoQuality = /* @__PURE__ */ ((VideoQuality2) => {
  VideoQuality2["P144"] = "144p";
  VideoQuality2["P240"] = "240p";
  VideoQuality2["P360"] = "360p";
  VideoQuality2["P480"] = "480p";
  VideoQuality2["P720"] = "720p";
  VideoQuality2["P1080"] = "1080p";
  VideoQuality2["P1440"] = "1440p";
  VideoQuality2["P2160"] = "2160p";
  VideoQuality2["P4320"] = "4320p";
  return VideoQuality2;
})(VideoQuality || {});

// src/utils/endpoints.ts
var Endpoints = {
  V1: {
    // Returns the URL endpoint for fetching detailed user profile information by username.
    Profile: (username) => `/user/user/information/username/${username}`,
    // Returns the URL endpoint for searching videos using a query string.
    SearchVideo: (query) => `/video/video/search/text/${query}/?type_search=search`,
    // Returns the URL endpoint for fetching user profile about me by username.
    AboutUser: (username) => `/user/user/about/username/${username}`
  },
  V2: {
    // Returns the URL endpoint for retrieving live stream profile information by username.
    Profile: (username) => `/Live/LiveStream/show/username/${username}`
  },
  Base: {
    // Returns the URL endpoint for fetching basic user profile details by username.
    Profile: (username) => `/profile/username/${username}`,
    // Returns the URL endpoint for fetching video details by its unique hash.
    GetVideo: (videoId) => `/video/videohash/${videoId}`
  }
};

// src/utils/error-handler.ts
var APIError = class _APIError extends Error {
  // The constructor accepts an error code and a message.
  constructor(code, message) {
    super(message);
    this.code = code;
    this.name = "AparatAPIError";
    Object.setPrototypeOf(this, _APIError.prototype);
  }
};

// src/services/user.ts
var UserService = class {
  constructor(api) {
    this.api = api;
  }
  /**
   * Retrieves the profile information of a user using two different API endpoints.
   * The first API call gets detailed profile attributes and the second provides additional link data.
   *
   * @param username - The username of the user.
   * @returns A Promise that resolves to a Profile object containing user details.
   * @throws APIError if the user is not found or an HTTP error occurs.
   */
  async getProfile(username) {
    try {
      const userApiV1Profile = await this.api.fetch(
        "API_V1_URL" /* ApiV1 */,
        Endpoints.V1.Profile(username)
      ), userApiV1About = await this.api.fetch(
        "API_V1_URL" /* ApiV1 */,
        Endpoints.V1.AboutUser(username)
      ), socialLinks = userApiV1About.data.attributes?.social;
      const data = {
        description: userApiV1About.meta.data.description,
        created_at: new Date(userApiV1About.meta.data.start_date),
        followers: userApiV1Profile.data.attributes.follower_cnt_num,
        followings: parseInt(userApiV1Profile.data.attributes.follow_cnt),
        total_video: parseInt(userApiV1About.meta.data.video_cnt),
        total_views: parseInt(userApiV1About.meta.data.total_visit.replaceAll(",", "")),
        month_views: parseInt(userApiV1About.meta.data.month_visit),
        is_forkids: userApiV1Profile.data.attributes.show_kids_friendly === "yes",
        is_banned: userApiV1Profile.data.attributes.banned === "yes",
        is_official: userApiV1Profile.data.attributes.official === "yes",
        user: {
          id: parseInt(userApiV1About.meta.data.id),
          name: userApiV1About.meta.data.name,
          username: userApiV1About.meta.data.username,
          hash_id: userApiV1Profile.data.attributes.hash_user_id,
          icon: userApiV1Profile.data.attributes.pic_b
        }
      };
      if (userApiV1Profile.data.attributes.cover_src.length > 0)
        data.cover = userApiV1Profile.data.attributes.cover_src;
      if (userApiV1About.meta.data.priority)
        data.priority = userApiV1About.meta.data.priority;
      if (socialLinks && socialLinks.length > 0)
        socialLinks.forEach((social) => {
          data.links = { ...data.links, [social.title]: social.link };
        });
      if (userApiV1About.meta.data.url)
        data.links.website = userApiV1About.meta.data.url;
      return data;
    } catch (error) {
      if (error instanceof APIError && error.code === 1001 /* HTTP_ERROR */) {
        throw new APIError(2001 /* USER_NOT_FOUND */, "User not defined");
      }
      throw error;
    }
  }
  /**
   * Checks if a user is currently live streaming.
   *
   * @param username - The username of the user.
   * @returns A Promise that resolves to a boolean indicating if the user is live.
   */
  async isStream(username) {
    const data = await this.api.fetch(
      "API_V2_URL" /* ApiV2 */,
      Endpoints.V2.Profile(username)
    );
    return data.live_status.type === "connected";
  }
  /**
   * Retrieves the live stream profile details for a user if they are currently streaming.
   *
   * @param username - The username of the user.
   * @returns A Promise that resolves to a StreamProfile object if streaming; otherwise, null.
   */
  async getStreamProfile(username) {
    const data = await this.api.fetch(
      "API_V2_URL" /* ApiV2 */,
      Endpoints.V2.Profile(username)
    );
    const isOnline = await this.isStream(username);
    if (isOnline) {
      return {
        url: `https://www.aparat.com/${data.username}/live`,
        title: data.title,
        description: data?.descr?.replace("<p>", "")?.replace("</p>", "") || null,
        cover: data.live_status.attributes.cover,
        donate_link: data.donate_link.url,
        last_start_date: data.last_session_start_time,
        last_end_date: data.last_session_end_time,
        moderators: data.moderator_data,
        vip_users: data.vip_users,
        tag: {
          id: parseInt(data.live_tag.tag_id),
          name: data.live_tag.tag_name,
          type: data.live_tag.tag_type,
          picture: data.live_tag.pic,
          is_game: data.live_tag.is_game
        },
        category: {
          id: parseInt(data.live_cat.cat_id),
          name: data.live_cat.cat_name
        },
        chat: {
          pined_message: data.chat_pin_message
        }
      };
    }
    return null;
  }
};

// src/core/config.ts
var config = {
  // Contains base URLs for different API versions and other API endpoints
  API_URLS: {
    // URL for API version 1
    API_V1_URL: "https://www.aparat.com/api/fa/v1",
    // URL for API version 2
    API_V2_URL: "https://www.aparat.com/api/fa/v2",
    // Base URL for miscellaneous API endpoints
    API_BASE_URL: "https://www.aparat.com/etc/api"
  },
  // Defines the rate limit: 1000 milliseconds between requests (i.e., 1 request per second)
  RATE_LIMIT: 1e3,
  // Maximum number of retry attempts for failed requests
  MAX_RETRIES: 3
};

// src/core/api.ts
var ApiService = class {
  rateLimit;
  lastRequestTime = 0;
  constructor() {
    this.rateLimit = config.RATE_LIMIT;
  }
  /**
   * Makes a fetch request to the specified API endpoint with rate limiting.
   * @param baseURL - The base URL type of the API.
   * @param endpoint - The specific API endpoint to call.
   * @param init - Optional fetch initialization parameters.
   * @returns A promise resolving to the response data of type T.
   * @throws {APIError} Throws an APIError if the request fails or the response is not OK.
   */
  async fetch(baseURL, endpoint, init) {
    const now = Date.now(), delay = this.rateLimit - (now - this.lastRequestTime);
    if (delay > 0)
      await new Promise((resolve) => setTimeout(resolve, delay));
    try {
      const response = await fetch(`${config.API_URLS[baseURL]}${endpoint}`, init);
      this.lastRequestTime = Date.now();
      if (!response.ok)
        throw new APIError(
          1001 /* HTTP_ERROR */,
          `HTTP Error: ${response.status}`
        );
      return await response.json();
    } catch (error) {
      throw this.handleError(error);
    }
  }
  /**
   * Handles errors by wrapping them in an APIError if necessary.
   * @param error - The error to handle.
   * @returns An instance of APIError.
   */
  handleError(error) {
    if (error instanceof APIError) return error;
    return new APIError(
      1e3 /* NETWORK_ERROR */,
      error instanceof Error ? error.message : "Unknown error"
    );
  }
};

// src/services/video.ts
import { createWriteStream, unlink } from "fs";
import * as https from "https";
var VideoService = class {
  constructor(api) {
    this.api = api;
  }
  /**
   * Searches for videos matching a query string.
   * It filters and maps the API response to an array of SearchVideo objects.
   *
   * @param query - The search term used to find videos.
   * @returns A Promise that resolves to an array of SearchVideo objects.
   */
  async search(query) {
    try {
      const data = await this.api.fetch(
        "API_V1_URL" /* ApiV1 */,
        Endpoints.V1.SearchVideo(query)
      );
      const results = data.included.filter((item) => item.type === "Video").map((item) => {
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
        };
      });
      return results;
    } catch (error) {
      throw new APIError(
        7001 /* SEARCH_ERROR */,
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
  async get(hash) {
    try {
      const data = await this.api.fetch(
        "API_BASE_URL" /* ApiBase */,
        Endpoints.Base.GetVideo(hash)
      );
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
        download_links: data.video.file_link_all.map((a) => ({ quality: a.profile, url: a.urls[0] }))
      };
    } catch (error) {
      throw new APIError(
        7001 /* SEARCH_ERROR */,
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
  async download(hash, quality = "720p" /* P720 */, outputPath = "./video.mp4") {
    try {
      const video = await this.get(hash);
      if (!video.is_download_able)
        throw new APIError(
          8001 /* DOWNLOAD_ERROR */,
          "This video is not download able!"
        );
      const downloadLinkObj = video.download_links.find((link) => link.quality === quality) || { quality: "unknown quality", url: video.download_link };
      if (!downloadLinkObj) {
        throw new APIError(
          8001 /* DOWNLOAD_ERROR */,
          "No download link to this video"
        );
      }
      await new Promise((resolve, reject) => {
        const file = createWriteStream(outputPath);
        https.get(downloadLinkObj.url, (response) => {
          response.pipe(file);
          file.on("finish", () => {
            file.close();
            resolve();
          });
        }).on("error", (err) => {
          unlink(outputPath, () => {
          });
          reject(new APIError(8001 /* DOWNLOAD_ERROR */, err.message));
        });
      });
    } catch (error) {
      throw new APIError(
        8001 /* DOWNLOAD_ERROR */,
        error instanceof Error ? error.message : "Faild to download the video!"
      );
    }
  }
};

// src/aparat.ts
var Aparat = class {
  user;
  // Provides methods to handle user-related operations.
  video;
  // Provides methods to handle video-related operations.
  events;
  // Handles event emitting for live stream notifications.
  constructor() {
    const apiService = new ApiService();
    this.user = new UserService(apiService);
    this.video = new VideoService(apiService);
    this.events = new AparatEventEmitter(this.user);
  }
};
export {
  Aparat,
  BaseApiUrlTypes,
  ErrorCodes,
  VideoQuality
};
