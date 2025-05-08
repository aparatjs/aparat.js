export interface ApiV1ProfileResponse {
    data: {
        type: "Profile";
        id: string;
        attributes: {
            id: string;
            hash_user_id: string;
            afcn: string;
            provider: string;
            username: string;
            name: string;
            pic_s: string;
            pic_m: string;
            pic_b: string;
            follower_cnt: string;
            follower_cnt_num: number;
            follow_cnt: string;
            official: null;
            url: string;
            video_cnt: string;
            cover_src: string;
            video_visit: string;
            priority: string;
            brand_priority: string;
            description: string;
            start_date: string;
            start_date_jalali: string;
            show_kids_friendly: string;
            banned: string;
        };
        relationships: {
            more: {
                data: {
                    type: "ProfileMore";
                    id: string;
                };
            };
            follow: {
                data: {
                    type: "Follow";
                    id: number;
                };
            };
        };
    };
    included: Array<
        | {
            type: "ProfileMore";
            id: string;
            attributes: any[];
        }
        | {
            type: "Follow";
            id: number;
            attributes: {
                link: string;
                link_toggle_push_follow: null;
                push_follow_status: null;
                status: string;
                userid: number;
                follower_cnt: string;
            };
        }
    >;
};
/**
 * @copyright
 * Code by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * Developed for Persian Caesar | https://github.com/Persian-Caesar | https://dsc.gg/persian-caesar
 *
 * If you encounter any issues or need assistance with this code,
 * please make sure to credit "Persian Caesar" in your documentation or communications.
 */