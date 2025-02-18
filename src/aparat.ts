import { AparatEventEmitter } from "./core/events";
import { UserService } from "./services/user";
import { ApiService } from "./core/api";
import { VideoService } from "./services/video";

// The Aparat class acts as a unified interface to interact with various services.
// It encapsulates user operations, video operations, and event handling.
export class Aparat {
  public readonly user: UserService;          // Provides methods to handle user-related operations.
  public readonly video: VideoService;        // Provides methods to handle video-related operations.
  public readonly events: AparatEventEmitter; // Handles event emitting for live stream notifications.

  constructor() {
    // Create an instance of ApiService which is used by both UserService and VideoService.
    const apiService = new ApiService();
    // Initialize the user service with the API service.
    this.user = new UserService(apiService);
    // Initialize the video service with the API service.
    this.video = new VideoService(apiService);
    // Initialize the event emitter with the user service for live stream event handling.
    this.events = new AparatEventEmitter(this.user);
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