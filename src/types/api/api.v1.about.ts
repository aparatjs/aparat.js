export interface ApiV1AboutResponse {
    data: ProfileMoreData;
    meta: MetaData;
}

interface ProfileMoreData {
    type: "ProfileMore";
    id: string;
    attributes: {
        social: Social[];
    };
}

interface Social {
    title: SocialMediaTitle;
    username: string;
    link: string;
    icon: Icon;
}

interface Icon {
    dark: string;
    light: string;
}

interface MetaData {
    data: MetaDetails;
}

interface MetaDetails {
    id: string;
    username: string;
    name: string;
    description: string;
    url: string;
    video_cnt: string;
    priority: null | string;
    start_date: string;
    start_date_jalali: string;
    total_visit: string;
    total_visit_str: string;
    month_visit: string;
    month_visit_str: string;
}

type SocialMediaTitle = "telegram" | "instagram" | "facebook" | "instagram";
/**
 * @copyright
 * Code by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * Developed for Persian Caesar | https://github.com/Persian-Caesar | https://dsc.gg/persian-caesar
 *
 * If you encounter any issues or need assistance with this code,
 * please make sure to credit "Persian Caesar" in your documentation or communications.
 */