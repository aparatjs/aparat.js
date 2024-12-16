import { EventEmitter } from "node:events";
import user from "./components/user";
import video from "./components/video";
import { Events, User } from "./components/types";

/**
 * @class
 * 
 * @description
 * Export all function from aparat.js package.
 * 
 * @example
 * ```js
 * const { API } = require("aparat.js");
 * const api = new API();
 * ```
 */
export class Aparat extends EventEmitter<Events> {
  user: user;
  video: video;
  constructor() {
    super();
    this.user = new user();
    this.video = new video();
  };

  /**
   * 
   * @param {string} username 
   * 
   * @description
   * Check the user is on stream or not.
   * 
   * If user doesn't on a stream nothing happend.
   * 
   * @example
   * ```js
   * api.checkStream("shervinbdndev");
   * api.once("start", async (user) => {
   *  console.log("User is on the stream: ", user.live.url);
   * });
   * ```
   */
  async checkStream(username: string) {
    let user: User = await this.user.search(username);
    let is_live = false;
    while (!is_live) {
      user = await this.user.search(username);
      if (user.live.is_live) {
        is_live = true;
        this.emit("start", user);
      }
    }
    this.emit("start", user);
  }
};
/**
 * @copyright
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @copyright
 */