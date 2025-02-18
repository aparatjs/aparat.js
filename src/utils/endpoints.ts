// Define endpoints for user-related API calls
export const Endpoints = {
  V1: {
    // Returns the URL endpoint for fetching detailed user profile information by username.
    Profile: (username: string) => `/user/user/information/username/${username}`,
    // Returns the URL endpoint for searching videos using a query string.
    SearchVideo: (query: string) => `/video/video/search/text/${query}/?type_search=search`,
    // Returns the URL endpoint for fetching user profile about me by username.
    AboutUser: (username: string) => `/user/user/about/username/${username}`
  },
  V2: {
    // Returns the URL endpoint for retrieving live stream profile information by username.
    Profile: (username: string) => `/Live/LiveStream/show/username/${username}`
  },
  Base: {
    // Returns the URL endpoint for fetching basic user profile details by username.
    Profile: (username: string) => `/profile/username/${username}`,
    // Returns the URL endpoint for fetching video details by its unique hash.
    GetVideo: (videoId: string) => `/video/videohash/${videoId}`
  }
};
/**
 * @copyright
 * Code by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * Developed for Persian Caesar | https://github.com/Persian-Caesar | https://dsc.gg/persian-caesar
 *
 * If you encounter any issues or need assistance with this code,
 * please make sure to credit "Persian Caesar" in your documentation or communications.
 */