// Export configuration settings for API endpoints, rate limiting, and retry attempts
export const config = {
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
 RATE_LIMIT: 1000,
 // Maximum number of retry attempts for failed requests
 MAX_RETRIES: 3
};
/**
 * @copyright
 * Code by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * Developed for Persian Caesar | https://github.com/Persian-Caesar | https://dsc.gg/persian-caesar
 *
 * If you encounter any issues or need assistance with this code,
 * please make sure to credit "Persian Caesar" in your documentation or communications.
 */