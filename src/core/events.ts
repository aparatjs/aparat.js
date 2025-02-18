import { AparatEventTypes } from '../types/types';
import { EventEmitter } from 'events';
import { UserService } from '../services/user';

// Custom event emitter for handling Aparat streaming events
export class AparatEventEmitter extends EventEmitter<AparatEventTypes> {
 // Stores active stream check intervals for each user
 private activeListeners = new Map<string, NodeJS.Timeout>();

 // Injects an instance of UserService to check streaming status
 constructor(private userService: UserService) {
  super();
 }

 /**
  * Starts a periodic check to see if a user is live streaming.
  * It checks immediately and then at every specified interval.
  * Emits a "live_start" event if the user is streaming.
  *
  * @param username - The username to monitor for live streams.
  * @param interval - Time in milliseconds between checks (default: 30000ms).
  */
 startStreamCheck(username: string, interval: number = 30000) {
  // Asynchronous function that performs the live stream check
  const check = async () => {
   try {
    const isLive = await this.userService.isStream(username);
    if (isLive) {
     // If live, fetch and emit the stream profile information
     const streamProfile = await this.userService.getStreamProfile(username);
     this.emit("live_start", streamProfile!);
    }
   } catch (error: any) {
    // Emit an error event if the check fails
    this.emit("error", error);
   }
  };

  // Schedule the periodic check and store its interval ID for later reference
  const intervalId = setInterval(check, interval);
  this.activeListeners.set(username, intervalId);
  // Run the check immediately before the interval starts
  check();
 }

 /**
  * Stops the periodic live stream check for a specified user.
  *
  * @param username - The username whose live stream check should be stopped.
  */
 stopStreamCheck(username: string) {
  // Retrieve and clear the interval for the given username, if it exists
  const intervalId = this.activeListeners.get(username);
  if (intervalId) {
   clearInterval(intervalId);
   this.activeListeners.delete(username);
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