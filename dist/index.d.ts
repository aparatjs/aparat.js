import { EventEmitter } from 'node:events';

interface User {
    description: string;
    created_at: string;
    followers: string;
    followers_int: number;
    followings: string;
    followings_int: number;
    priority: string;
    total_video: number;
    total_views: string;
    is_forkids: boolean;
    is_banned: boolean;
    is_official: boolean;
    user: {
        name: string;
        username: string;
        id: number;
        hash_id: string;
        icon: string | null;
        cover: string | null;
        links: {
            website: string | null;
            twitter: string | null;
            lenzor: string | null;
            cloob: string | null;
            facebook: string | null;
        };
    };
    live: {
        is_live: boolean;
        url: string;
        title: string | null;
        description: string | null;
        cover: string | null;
        donate_link: string | null;
        last_start_date: string | null;
        last_end_date: string | null;
        moderators: any | null;
        vip_users: any | null;
        tag: {
            id: number | null;
            name: string | null;
            type: string | null;
            picture: string | null;
            is_game: boolean | null;
        };
        category: {
            id: number | null;
            name: string | null;
        };
        chat: {
            pined_message: string | null;
        };
    };
}
interface Video {
    id: number;
    hash_id: string;
    title: string;
    description: string;
    url: string;
    uploader: {
        name: string;
        username: string;
        id: number;
        icon: string;
        is_official: boolean;
    };
    tags: Array<{
        name: string;
        video_cnt: number;
    }>;
    views: string;
    views_int: number;
    likes: number;
    duration: number;
    poster: string;
    preview: string;
    frame: string;
    publish_at: string;
}
type Events = {
    "start": [user: User];
};
/**
 * @copyright
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us Persian Caesar, When Have Problem With Using This Code!
 * @copyright
 */

declare class export_default$1{
    /**
     *
     * @param {string} username
     *
     * @description
     * Finding a user by username or user profile url and returns user profile informations.
     *
     * @example
     * ```js
     * const { Aparat } = require("aparat.js");
     * const aparat = new Aparat();
     * (async () => {
     *  // User information results.
     *  const user = await aparat.user.search("shervinbdndev");
     *  console.log(`Followers: ${user.followers.toLocaleString()}`);
     *  console.log(`Followings: ${user.followings.toLocaleString()}`);
     * })();
     * ```
     */
    search(username: string): Promise<User>;
}

declare class export_default{
    /**
     *
     * @param {string} args
     *
     * @description
     * Search for a videos with name or tag and returns the videos information in Array.
     *
     * @example
     * ```js
     * const { Aparat } = require("aparat.js");
     * const aparat = new Aparat();
     * (async () => {
     *  // Searched vidoe results.
     *  const videos = await aparat.video.search("SpongBob");
     *  console.log(videos);
     * })();
     * ```
     */
    search(args: string): Promise<Video[]>;
}

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
declare class Aparat extends EventEmitter<Events> {
    user: export_default$1;
    video: export_default;
    constructor();
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
    checkStream(username: string): Promise<void>;
}

export { Aparat };
