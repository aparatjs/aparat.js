interface User {
 description: string,
 created_at: string,
 followers: string,
 followers_int: number,
 followings: string,
 followings_int: number,
 priority: string,
 total_video: number,
 total_views: string,
 is_forkids: boolean,
 is_banned: boolean,
 is_official: boolean,
 user: {
  name: string,
  username: string,
  id: number,
  hash_id: string,
  icon: string | null,
  cover: string | null,
  links: {
   website: string | null,
   twitter: string | null,
   lenzor: string | null,
   cloob: string | null,
   facebook: string | null
  }
 },
 live: {
  is_live: boolean,
  url: string,
  title: string | null,
  description: string | null,
  cover: string | null,
  donate_link: string | null,
  last_start_date: string | null,
  last_end_date: string | null,
  moderators: any | null,
  vip_users: any | null,
  tag: {
   id: number | null,
   name: string | null,
   type: string | null,
   picture: string | null,
   is_game: boolean | null
  },
  category: {
   id: number | null,
   name: string | null
  },
  chat: {
   pined_message: string | null
  }
 }
}

interface UserAPI1 {
 id: number,
 hash_user_id: string,
 afcn: number,
 provider: number,
 username: string,
 name: string,
 pic_s: string,
 pic_m: string,
 pic_b: string,
 follower_cnt: string,
 follower_cnt_num: number,
 follow_cnt: string,
 official: "no" | "yes",
 url: string,
 video_cnt: string,
 cover_src: string,
 video_visit: string,
 priority: null,
 brand_priority: number,
 description: string,
 start_date: string,
 start_date_jalali: string,
 show_kids_friendly: "no" | "yes",
 banned: "no" | "yes",
 has_event: boolean
}

interface UserAPI2 {
 pic_s: string,
 pic_m: string,
 pic_b: string,
 username: string,
 userid: number,
 name: string,
 video_cnt: string,
 url: string,
 follower_cnt: string,
 followed_cnt: string,
 descr: string,
 official: "no" | "yes",
 cloob: string,
 lenzor: string,
 facebook: string,
 twitter: string,
 follow_link: string,
 follow_status: string,
 cover_src: string,
 has_live: "no" | "yesy",
 profile_videos: string
}

interface UserAPI3 {
 id: number,
 title: string,
 descr: string,
 live_code: string,
 live_type: string,
 aspectRatio: string,
 rotatable: boolean,
 profile: {
  id: string,
  username: string,
  name: null,
  url: string,
  follow: {
   link: string,
   link_toggle_push_follow: string,
   push_follow_status: null,
   status: "login",
   type: "follow",
   userid: number,
   follower_cnt: string
  },
  pic_s: string,
  pic_m: string,
  pic_b: string
 },
 stream_line: {
  hls: string,
  rtmp: string,
  dash: string,
  raw: string,
  hash_map: string
 },
 brand_priority: string,
 oneping: {
  duration: number,
  socket_server: string,
  socket_server_mobile: null
 },
 stat: {
  online_cnt: number,
  formatted_online_cnt: string,
  peak_cnt: number,
  formatted_peak_cnt: string,
  total_cnt: number,
  formatted_total_cnt: string
 },
 live_status: {
  type: string,
  attributes: {
   cover: string
  }
 },
 donate_link: {
  title: string,
  url: string
 },
 room_status: {
  can_comment: "yes" | "no",
  show_comment: "yes" | "no",
  can_like: "yes" | "no",
  show_like: "yes" | "no"
 },
 hype_train: "yes" | "no",
 hype_train_data: null,
 hype_train_emote_data: null,
 is_private: boolean,
 guest_room_status: {
  show_comment: "yes" | "no",
  can_comment: "no" | "yes",
  show_like: "yes" | "no",
  can_like: "yes" | "no"
 },
 live_tag: {
  tag_id: string,
  tag_name: string,
  f_tag_name: string,
  tag_type: string,
  tag_link: string,
  pic: string,
  is_game: boolean
 },
 live_cat: {
  cat_id: string,
  cat_name: string
 },
 user_data: null,
 timeout_user: boolean,
 stream_theme: {
  theme: string,
  time: null
 },
 banned_request_status: boolean,
 vip_users: Array<string>,
 uuid: string,
 is_host: boolean,
 squad_users: null,
 squad_stream_id: string,
 user_follow_time: number,
 startTime: string,
 priority: string,
 access_region: string,
 live_profile_id: string,
 dvr: "off" | "on",
 priority_date_from: string,
 priority_date_to: string,
 show_new_follower_attention: "yes" | "no",
 chat_pin_message: string,
 chat_pin_actor_user_name: string,
 liveTime: {
  hours: number,
  minutes: number,
  seconds: number
 },
 bot_config: any,
 profanity_status: string,
 subscriber_only_message: "no" | "yes",
 message_delay_time: string,
 connection_stat: string,
 badge_data: {
  1: string,
  3: string,
  6: string,
  12: string
 },
 moderator_data: Array<string>,
 moderator_permissions: any,
 final_score: number,
 last_session_end_time: string,
 last_session_start_time: string,
 change_ban_status_hash: string,
 is_irancell: "no" | "yes",
 is_rightel: "no" | "yes",
 full_price: [],
 user_emotes: [],
 meta: {
  embed_url: string
 },
 pinned_comment: string,
 chatbot_fields: string,
 priority_from_date: number,
 priority_to_date: number,
 jwt: string,
 playerOption: {
  isLive: boolean,
  hideGoTheater: boolean,
  chatEnable: boolean,
  liveStatus: string,
  ads: any,
  stats: null,
  multiSRC: [],
  isEventLive: boolean
 },
 customPageName: string
 noStat: boolean,
 event_info: [],
 user_donate_credit: number,
 streamer_details_cover: Array<{
  id: string,
  user_id: string,
  stream_id: string,
  position: string,
  file_name: string,
  full_real_path: string,
  img_id: string,
  force_bucket_name: string,
  description: string,
  url: string,
  sdate: string,
  image: string
 }>,
 only_mobile_can_chat_pass: boolean,
 emote_only: "no" | "yes",
 required_follow_time_for_chat: string,
 admins: Array<string>,
 subscribe_url: {
  link: string,
  text: string,
  isSubscribe: boolean,
  status: string,
  canSubscribe: boolean,
  subscribed_twice: boolean
 },
 lockEvent: boolean,
 subDonators: any,
 embedTitle: boolean,
 uxDataPage: {
  live: []
 },
 username: string,
 streamerUserId: string,
 page_type: string,
 visitor_brand_priority: null
}

interface Video {
 id: number,
 hash_id: string,
 title: string,
 description: string,
 url: string,
 uploader: {
  name: string,
  username: string,
  id: number,
  icon: string,
  is_official: boolean
 },
 tags: Array<{ name: string; video_cnt: number; }>,
 views: string,
 views_int: number,
 likes: number,
 duration: number,
 poster: string,
 preview: string,
 frame: string,
 publish_at: string,
 // file_link_all: Array<{
 //  text: string;
 //  profile: string;
 //  urls: string[]
 // }> | null
}

interface VideoAPI {
 type: "Video" | "channel" | null,
 id: number,
 attributes: {
  id: number,
  title: string,
  description: string,
  username: string,
  userid: number,
  tags: Array<{ name: string; video_cnt: number; }>,
  uid: string,
  isHidden: boolean,
  visit_cnt: string,
  visit_cnt_int: number,
  process: "done" | null,
  sender_name: string,
  big_poster: string,
  small_poster: string,
  medium_poster: string,
  profilePhoto: string,
  duration: number,
  date_exact: string,
  sdate: string,
  sdate_rss: string,
  sdate_timediff: number,
  frame: string,
  official: "yes" | "no",
  autoplay: boolean,
  "360d": null,
  brand_priority: number,
  like_cnt: number,
  preview_src: string,
  file_link_all: null,
  file_link: null,
  videovisit: null,
  like: {
   cnt: number
  },
  share: null,
  meta: null,
  catId: number,
  hd: "no" | "yes",
  sensitive: boolean,
  content_type: null,
  isCompany: boolean,
  isAbroad: boolean,
  link_add_watch_later: null,
  hls_link: string,
  watch: {
   watchTimeMinStr: string,
   durationPercentWatch: number,
   avgWatchDuration: number,
   avgWatchDurationLabel: string,
   text: string,
   monthWatch: number
  }
 },
 relationships: {
  channel: {
   data: {
    type: "channel",
    id: number
   }
  }
 }
}

interface VideoAPIHash {
 id: number,
 title: string,
 username: string,
 userid: number,
 visit_cnt: number,
 uid: string,
 isHidden: null,
 process: "done",
 sender_name: string,
 big_poster: string,
 small_poster: string,
 profilePhoto: string,
 duration: number,
 sdate: string,
 create_date: string,
 sdate_timediff: number,
 frame: string,
 official: "no" | "yes",
 tags: Array<{ name: string; video_cnt: number; }>,
 tag_str: string,
 description: string,
 cat_id: number,
 cat_name: string,
 cat_name_en: string,
 autoplay: boolean,
 video_date_status: "notset",
 "360d": boolean,
 deleteurl: null,
 playeradvertcornel: null,
 has_comment: "yes" | "no",
 has_comment_txt: null,
 size: number,
 watch_action: {
  type: "watch"
 },
 cost_type: {
  type: "free"
 },
 can_download: boolean,
 like_cnt: number,
 follow_link: string,
 follow_status: "login",
 ip_address: string,
 file_link: string,
 file_link_all: Array<{
  text: "با کیفیت 144p" | "با کیفیت 240p" | "با کیفیت 360p" | "با کیفیت 480p" | "با کیفیت 720p" | "با کیفیت 1080";
  profile: "144p" | "240p" | "360p" | "480p" | "720p" | "1080p";
  urls: string[]
 }>
}

type Events = {
 "start": [user: User];
}

export type {
 UserAPI1,
 UserAPI2,
 UserAPI3,
 VideoAPI,
 VideoAPIHash,
 Events,
 Video,
 User
}
/**
 * @copyright
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us Persian Caesar, When Have Problem With Using This Code!
 * @copyright
 */