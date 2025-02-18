import { BaseApiUrlTypes, ErrorCodes } from "../types/enums";
import { ApiBaseProfileResponse } from "../types/api/api.base.profile";
import { Profile, StreamProfile } from "../types/interfaces";
import { ApiV1ProfileResponse } from "../types/api/api.v1.profile";
import { ApiV2ProfileResponse } from "../types/api/api.v2.profile";
import { ApiService } from "../core/api";
import { Endpoints } from "../utils/endpoints";
import { APIError } from "../utils/error-handler";
import { ApiV1AboutResponse } from "../types/api/api.v1.about";

export class UserService {
 constructor(private api: ApiService) { }

 /**
  * Retrieves the profile information of a user using two different API endpoints.
  * The first API call gets detailed profile attributes and the second provides additional link data.
  *
  * @param username - The username of the user.
  * @returns A Promise that resolves to a Profile object containing user details.
  * @throws APIError if the user is not found or an HTTP error occurs.
  */
 public async getProfile(username: string): Promise<Profile> {
  try {
   const

    // Fetch detailed profile attributes from API V1
    userApiV1Profile: ApiV1ProfileResponse = await this.api.fetch(
     BaseApiUrlTypes.ApiV1,
     Endpoints.V1.Profile(username)
    ),

    // Fetch additional base profile about (like social links) from API V1
    userApiV1About: ApiV1AboutResponse = await this.api.fetch(
     BaseApiUrlTypes.ApiV1,
     Endpoints.V1.AboutUser(username)
    ),

    // Get social links from API
    socialLinks = userApiV1About.data.attributes?.social;

   // Combine data from both endpoints to construct and return the Profile object
   const data: any = {
    description: userApiV1About.meta.data.description,
    created_at: new Date(userApiV1About.meta.data.start_date),
    followers: userApiV1Profile.data.attributes.follower_cnt_num,
    followings: parseInt(userApiV1Profile.data.attributes.follow_cnt),
    total_video: parseInt(userApiV1About.meta.data.video_cnt),
    total_views: parseInt(userApiV1About.meta.data.total_visit.replaceAll(",", "")),
    month_views: parseInt(userApiV1About.meta.data.month_visit),
    is_forkids: userApiV1Profile.data.attributes.show_kids_friendly === "yes",
    is_banned: userApiV1Profile.data.attributes.banned === "yes",
    is_official: userApiV1Profile.data.attributes.official === "yes",
    user: {
     id: parseInt(userApiV1About.meta.data.id),
     name: userApiV1About.meta.data.name,
     username: userApiV1About.meta.data.username,
     hash_id: userApiV1Profile.data.attributes.hash_user_id,
     icon: userApiV1Profile.data.attributes.pic_b
    }
   };

   if (userApiV1Profile.data.attributes.cover_src.length > 0)
    data.cover = userApiV1Profile.data.attributes.cover_src

   if (userApiV1About.meta.data.priority)
    data.priority = userApiV1About.meta.data.priority;

   if (socialLinks && socialLinks.length > 0)
    socialLinks.forEach(social => {
     data.links = { ...data.links, [social.title]: social.link };
    });

   if (userApiV1About.meta.data.url)
    data.links.website = userApiV1About.meta.data.url;

   return data;
  } catch (error) {
   // Convert HTTP errors into a USER_NOT_FOUND error for clarity
   if (error instanceof APIError && error.code === ErrorCodes.HTTP_ERROR) {
    throw new APIError(ErrorCodes.USER_NOT_FOUND, "User not defined");
   }
   throw error;
  }
 }

 /**
  * Checks if a user is currently live streaming.
  *
  * @param username - The username of the user.
  * @returns A Promise that resolves to a boolean indicating if the user is live.
  */
 public async isStream(username: string): Promise<boolean> {
  // Fetch live streaming status from API V2
  const data: ApiV2ProfileResponse = await this.api.fetch(
   BaseApiUrlTypes.ApiV2,
   Endpoints.V2.Profile(username)
  );
  // Return true if the live status indicates the user is connected (live)
  return data.live_status.type === "connected";
 }

 /**
  * Retrieves the live stream profile details for a user if they are currently streaming.
  *
  * @param username - The username of the user.
  * @returns A Promise that resolves to a StreamProfile object if streaming; otherwise, null.
  */
 public async getStreamProfile(username: string): Promise<StreamProfile | null> {
  // Fetch live streaming data from API V2
  const data: ApiV2ProfileResponse = await this.api.fetch(
   BaseApiUrlTypes.ApiV2,
   Endpoints.V2.Profile(username)
  );
  // Check if the user is currently live
  const isOnline = await this.isStream(username);

  if (isOnline) {
   // If live, construct and return a StreamProfile object with stream details
   return {
    url: `https://www.aparat.com/${data.username}/live`,
    title: data.title,
    description: data?.descr?.replace("<p>", "")?.replace("</p>", "") || null,
    cover: data.live_status.attributes.cover,
    donate_link: data.donate_link.url,
    last_start_date: data.last_session_start_time,
    last_end_date: data.last_session_end_time,
    moderators: data.moderator_data,
    vip_users: data.vip_users,
    tag: {
     id: parseInt(data.live_tag.tag_id),
     name: data.live_tag.tag_name,
     type: data.live_tag.tag_type,
     picture: data.live_tag.pic,
     is_game: data.live_tag.is_game,
    },
    category: {
     id: parseInt(data.live_cat.cat_id),
     name: data.live_cat.cat_name,
    },
    chat: {
     pined_message: data.chat_pin_message,
    },
   };
  }

  // Return null if the user is not live streaming
  return null;
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