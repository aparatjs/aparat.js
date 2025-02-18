import { ErrorCodes } from "../types/enums";

// Custom error class for API errors, extending the built-in Error class.
export class APIError extends Error {
  // The constructor accepts an error code and a message.
  constructor(
    public code: ErrorCodes, // The specific error code associated with the error.
    message: string         // A descriptive message for the error.
  ) {
    super(message); // Pass the message to the parent Error class.
    this.name = "AparatAPIError"; // Set a custom error name for easier identification.
    // Fix the prototype chain to ensure instanceof works correctly.
    Object.setPrototypeOf(this, APIError.prototype);
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