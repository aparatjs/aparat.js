export interface ApiV2ProfileResponse {
 id: number;
 title: string;
 descr: string;
 live_code: string;
 live_type: string;
 aspectRatio: string;
 rotatable: boolean;
 profile: Profile;
 stream_line: null;
 brand_priority: string;
 oneping: Oneping;
 stat: Stat;
 live_status: LiveStatus;
 donate_link: DonateLink;
 room_status: RoomStatus;
 hype_train: string;
 hype_train_data: null;
 hype_train_emote_data: null;
 is_private: boolean;
 guest_room_status: GuestRoomStatus;
 live_tag: LiveTag;
 live_cat: LiveCat;
 user_data: null;
 timeout_user: boolean;
 stream_theme: StreamTheme;
 banned_request_status: boolean;
 vip_users: string;
 uuid: string;
 is_host: boolean;
 squad_users: null;
 squad_stream_id: string;
 user_follow_time: number;
 startTime: string;
 priority: null;
 access_region: string;
 live_profile_id: string;
 dvr: string;
 priority_date_from: string;
 priority_date_to: string;
 show_new_follower_attention: string;
 chat_pin_message: string;
 chat_pin_actor_user_name: string;
 liveTime: any[];
 bot_config: BotConfig;
 profanity_status: string;
 subscriber_only_message: string;
 message_delay_time: string;
 connection_stat: string;
 badge_data: null;
 moderator_data: string[];
 moderator_permissions: { [key: string]: string[] };
 final_score: number;
 last_session_end_time: string;
 last_session_start_time: string;
 change_ban_status_hash: string;
 is_irancell: string;
 is_rightel: string;
 full_price: any[];
 user_emotes: any[];
 meta: Meta;
 pinned_comment: string;
 chatbot_fields: string;
 priority_from_date: number;
 priority_to_date: number;
 jwt: string;
 playerOption: PlayerOption;
 customPageName: string;
 noStat: boolean;
 event_info: any[];
 user_donate_credit: number;
 streamer_details_cover: StreamerDetailsCover[];
 only_mobile_can_chat_pass: boolean;
 emote_only: string;
 required_follow_time_for_chat: string;
 admins: string[];
 subscribe_url: boolean;
 lockEvent: boolean;
 subDonators: any[];
 embedTitle: boolean;
 uxDataPage: UxDataPage;
 username: string;
 streamerUserId: string;
 page_type: string;
 visitor_brand_priority: null;
}

interface Profile {
 id: string;
 username: string;
 name: string | null;
 url: string;
 follow: Follow;
 pic_s: string;
 pic_m: string;
 pic_b: string;
}

interface Follow {
 link: string;
 link_toggle_push_follow: string;
 push_follow_status: null;
 status: string;
 type: string;
 userid: number;
 follower_cnt: string;
}

interface Oneping {
 duration: number;
 socket_server: string;
 socket_server_mobile: null;
}

interface Stat {
 online_cnt: number;
 formatted_online_cnt: string;
 peak_cnt: number;
 formatted_peak_cnt: string;
 total_cnt: number;
 formatted_total_cnt: string;
}

interface LiveStatus {
 type: "nolive" | "connected";
 attributes: LiveStatusAttributes;
}

interface LiveStatusAttributes {
 cover: string;
}

interface DonateLink {
 title: string;
 url: string;
}

interface RoomStatus {
 can_comment: string;
 show_comment: string;
 can_like: string;
 show_like: string;
}

interface GuestRoomStatus {
 show_comment: string;
 can_comment: string;
 show_like: string;
 can_like: string;
}

interface LiveTag {
 tag_id: string;
 tag_name: string;
 f_tag_name: string;
 tag_type: string;
 tag_link: string;
 pic: null;
 is_game: boolean;
}

interface LiveCat {
 cat_id: string;
 cat_name: string;
}

interface StreamTheme {
 theme: string;
 time: null;
}

interface BotConfig {
 help: HelpItem[];
 timer: TimerItem[];
}

interface HelpItem {
 name: string;
 message: string;
}

interface TimerItem {
 time: string;
 message: string;
}

interface Meta {
 embed_url: string;
}

interface PlayerOption {
 isLive: boolean;
 hideGoTheater: boolean;
 chatEnable: boolean;
 liveStatus: string;
 ads: { [key: string]: any };
 stats: null;
 multiSRC: MultiSrc[][];
 isEventLive: boolean;
}

interface MultiSrc {
 type: string;
 src: string | null;
}

interface StreamerDetailsCover {
 id: string;
 user_id: string;
 stream_id: string;
 position: string;
 file_name: string;
 full_real_path: string;
 img_id: string;
 force_bucket_name: string;
 description: string;
 url: string;
 sdate: string;
 image: string;
}

interface UxDataPage {
 live: any[];
}
/**
 * @copyright
 * Code by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * Developed for Persian Caesar | https://github.com/Persian-Caesar | https://dsc.gg/persian-caesar
 *
 * If you encounter any issues or need assistance with this code,
 * please make sure to credit "Persian Caesar" in your documentation or communications.
 */