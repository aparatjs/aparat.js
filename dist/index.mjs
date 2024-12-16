// src/index.ts
import { EventEmitter } from "node:events";

// src/components/error.ts
var error_default = class extends Error {
  constructor(message) {
    super();
    this.name = "AparatJS";
    this.message = message;
  }
};

// src/components/user.ts
var user_default = class {
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
  search(username) {
    async function results() {
      try {
        const url = "https://www.aparat.com/api/fa/v1/user/user/information/username/", url1 = "https://www.aparat.com/api/fa/v2/Live/LiveStream/show/username/", url2 = "https://www.aparat.com/etc/api/profile/username/", res = await fetch(url + username).then((res2) => res2.json()), res1 = await fetch(url2 + username).then((res2) => res2.json()), live = await fetch(url1 + username).then((res2) => res2.json()), user = res.data.attributes, user1 = res1.profile, results2 = {
          description: user.description,
          created_at: user.start_date,
          followers: user.follower_cnt,
          followers_int: Number(user1.follower_cnt),
          followings: user.follow_cnt,
          followings_int: Number(user1.followed_cnt),
          priority: String(user.priority),
          total_video: Number(user.video_cnt),
          total_views: user.video_visit,
          is_forkids: user.show_kids_friendly == "no" ? false : true,
          is_banned: user.banned == "no" ? false : true,
          is_official: user1.official == "yes" ? true : false,
          user: {
            name: user.name,
            username: user.username,
            id: Number(user.id),
            hash_id: user.hash_user_id,
            icon: user.pic_b,
            cover: user.cover_src,
            links: {
              website: user1.url,
              twitter: user1.twitter,
              lenzor: user1.lenzor,
              cloob: user1.cloob,
              facebook: user1.facebook
            }
          },
          live: {
            is_live: live.live_status.type === "connected" ? true : false,
            url: `https://www.aparat.com/${user.username}/live`,
            title: live.title ? live.title : null,
            description: live.descr ? live.descr.replace("<p>", "").replace("</p>", "") : null,
            cover: live.live_status?.attributes?.cover,
            donate_link: live.donate_link?.url,
            last_start_date: live.last_session_start_time,
            last_end_date: live.last_session_end_time,
            moderators: live.moderator_data,
            vip_users: live.vip_users,
            tag: {
              id: live.live_tag?.tag_id ? Number(live.live_tag?.tag_id) : null,
              name: live.live_tag?.tag_name,
              type: live.live_tag?.tag_type,
              picture: live.live_tag?.pic,
              is_game: live.live_tag?.is_game ? Boolean(live.live_tag?.is_game) : null
            },
            category: {
              id: live.live_cat?.cat_id ? Number(live.live_cat?.cat_id) : null,
              name: live.live_cat?.cat_name
            },
            chat: {
              pined_message: live.chat_pin_message
            }
          }
        };
        return results2;
      } catch (e) {
        if (e.stack.includes("Unexpected token"))
          return results();
        if (e.name.startsWith("TypeError: fetch failed"))
          throw new error_default("Connection Error \n" + e);
        if (e.name.startsWith('<!DOCTYPE html><html lang="fa"><head><title>\u062E\u0637\u0627 404 - \u0635\u0641\u062D\u0647 \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F | \u0622\u067E\u0627\u0631\u0627\u062A</title>'))
          throw new error_default("User not found OwO");
        throw new error_default("Unexpected Error OwO\n" + e);
      }
    }
    ;
    return results();
  }
};

// src/components/video.ts
var video_default = class {
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
  async search(args) {
    async function videos() {
      try {
        const url = `https://www.aparat.com/api/fa/v1/video/video/search/text/${args}/?type_search=search`, res = await fetch(url).then((res2) => res2.json()), results = [];
        await res.included.forEach(async (element) => {
          results.push({
            id: element.attributes.id,
            hash_id: element.attributes.uid,
            title: element.attributes.title,
            description: element.attributes.description,
            url: `https://www.aparat.com/v/${element.attributes.uid}`,
            uploader: {
              name: element.attributes.sender_name,
              username: element.attributes.username,
              id: element.attributes.userid,
              icon: element.attributes.profilePhoto,
              is_official: element.attributes.official == "no" ? false : true
            },
            tags: element.attributes.tags,
            views: element.attributes.visit_cnt,
            views_int: Number(element.attributes.visit_cnt_int),
            likes: Number(element.attributes.like_cnt),
            duration: element.attributes.duration,
            poster: element.attributes.big_poster,
            preview: element.attributes.preview_src,
            frame: element.attributes.frame,
            publish_at: element.attributes.sdate_rss
          });
        });
        return results;
      } catch (e) {
        if (e.stack.includes("Unexpected token"))
          return await videos();
        if (e.name.startsWith("TypeError: fetch failed"))
          throw new error_default("Connection Error \n" + e);
        if (e.stack.includes("404"))
          throw new error_default("Video not found OwO");
        throw new error_default("Unexpected Error OwO\n" + e);
      }
    }
    ;
    return await videos();
  }
};

// src/index.ts
var Aparat = class extends EventEmitter {
  user;
  video;
  constructor() {
    super();
    this.user = new user_default();
    this.video = new video_default();
  }
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
  async checkStream(username) {
    let user = await this.user.search(username);
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
export {
  Aparat
};
