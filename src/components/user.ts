import error from "./error";
import { User, UserAPI1, UserAPI2, UserAPI3 } from "./types";

export default class {

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
    search(username: string): Promise<User> {
        async function results() {
            try {
                const
                    url = "https://www.aparat.com/api/fa/v1/user/user/information/username/",
                    url1 = "https://www.aparat.com/api/fa/v2/Live/LiveStream/show/username/",
                    url2 = "https://www.aparat.com/etc/api/profile/username/",
                    res = await fetch(url + username).then(res => res.json()),
                    res1 = await fetch(url2 + username).then(res => res.json()),
                    live: UserAPI3 = await fetch(url1 + username).then(res => res.json()),
                    user: UserAPI1 = res.data.attributes,
                    user1: UserAPI2 = res1.profile,
                    results: User = {
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

                return results;
            } catch (e: any) {
                if (e.stack.includes("Unexpected token"))
                    return results();

                if (e.name.startsWith("TypeError: fetch failed"))
                    throw new error("Connection Error \n" + e);

                if (e.name.startsWith("<!DOCTYPE html><html lang=\"fa\"><head><title>خطا 404 - صفحه پیدا نشد | آپارات</title>"))
                    throw new error("User not found OwO");

                throw new error("Unexpected Error OwO\n" + e);
            }
        };
        return results();
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