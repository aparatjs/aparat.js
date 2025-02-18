export enum ErrorCodes {
 NETWORK_ERROR = 1000,
 HTTP_ERROR = 1001,
 USER_NOT_FOUND = 2001,
 VIDEO_NOT_FOUND = 3001,
 RATE_LIMIT_EXCEEDED = 4001,
 AUTH_FAILED = 5001,
 WEBHOOK_ERROR = 6001,
 SEARCH_ERROR = 7001,
 DOWNLOAD_ERROR = 8001
}

export enum BaseApiUrlTypes {
 ApiV1 = "API_V1_URL",
 ApiV2 = "API_V2_URL",
 ApiBase = "API_BASE_URL"
}

export enum VideoQuality {
 P144 = "144p",
 P240 = "240p",
 P360 = "360p",
 P480 = "480p",
 P720 = "720p",
 P1080 = "1080p",
 P1440 = "1440p",
 P2160 = "2160p", // 4K
 P4320 = "4320p" // 8K
}
/**
 * @copyright
 * Code by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * Developed for Persian Caesar | https://github.com/Persian-Caesar | https://dsc.gg/persian-caesar
 *
 * If you encounter any issues or need assistance with this code,
 * please make sure to credit "Persian Caesar" in your documentation or communications.
 */