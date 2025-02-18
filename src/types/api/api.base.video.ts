export interface ApiVideoHashResponse {
 video: Video;
}

interface Video {
 id: string;
 title: string;
 username: string;
 userid: string;
 visit_cnt: number;
 uid: string;
 isHidden: null;
 process: string;
 sender_name: string;
 big_poster: string;
 small_poster: string;
 profilePhoto: string;
 duration: number;
 sdate: string;
 create_date: string;
 sdate_timediff: number;
 frame: string;
 official: string;
 tags: Tag[];
 tag_str: string;
 description: string;
 cat_id: number;
 cat_name: string;
 cat_name_en: string;
 autoplay: boolean;
 video_date_status: string;
 "360d": boolean;
 deleteurl: string;
 playeradvertcornel: string;
 has_comment: string;
 has_comment_txt: string;
 size: string;
 watch_action: WatchAction;
 cost_type: CostType;
 can_download: boolean;
 like_cnt: number;
 follow_link: string;
 follow_status: string;
 ip_address: string;
 file_link: string;
 file_link_all: FileLinkAll[];
}

export interface Tag {
 name: string;
 video_cnt: string;
}

interface WatchAction {
 type: string;
}

interface CostType {
 type: string;
}

interface FileLinkAll {
 text: string;
 profile: string;
 urls: string[];
}
/**
 * @copyright
 * Code by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * Developed for Persian Caesar | https://github.com/Persian-Caesar | https://dsc.gg/persian-caesar
 *
 * If you encounter any issues or need assistance with this code,
 * please make sure to credit "Persian Caesar" in your documentation or communications.
 */