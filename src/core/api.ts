import { BaseApiUrlTypes, ErrorCodes } from "../types/enums";
import { APIError } from "../utils/error-handler";
import { config } from "../core/config";

export class ApiService {
 private rateLimit: number;
 private lastRequestTime: number = 0;

 constructor() {
  // Initialize the rate limit from configuration
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
 public async fetch<T>(baseURL: BaseApiUrlTypes, endpoint: string, init?: RequestInit): Promise<T> {
  const
   now = Date.now(),
   delay = this.rateLimit - (now - this.lastRequestTime);

  // Delay the request if it's being made too quickly
  if (delay > 0)
   await new Promise(resolve => setTimeout(resolve, delay));

  try {
   const response = await fetch(`${config.API_URLS[baseURL]}${endpoint}`, init);
   this.lastRequestTime = Date.now();

   // Throw an error if the HTTP response is not OK
   if (!response.ok)
    throw new APIError(
     ErrorCodes.HTTP_ERROR,
     `HTTP Error: ${response.status}`
    );

   // Parse and return the JSON response
   return await response.json();
  } catch (error) {

   // Handle and rethrow errors appropriately
   throw this.handleError(error);
  }
 }

 /**
  * Handles errors by wrapping them in an APIError if necessary.
  * @param error - The error to handle.
  * @returns An instance of APIError.
  */
 private handleError(error: unknown): APIError {
  if (error instanceof APIError) return error;
  return new APIError(
   ErrorCodes.NETWORK_ERROR,
   error instanceof Error ? error.message : "Unknown error"
  );
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