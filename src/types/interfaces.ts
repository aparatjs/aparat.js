import { Tag } from "./api/api.base.video"

export interface StreamProfile {
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

export interface Profile {
    description: string,
    created_at: Date,
    followers: number,
    followings: number,
    priority?: string,
    total_video: number,
    total_views: number,
    month_views: number,
    is_forkids: boolean,
    is_banned: boolean,
    is_official: boolean,
    user: {
        name: string,
        username: string,
        id: number,
        hash_id: string,
        icon: string,
        cover?: string,
        links?: {
            website?: string,
            twitter?: string,
            instagram?: string,
            telegram?: string,
            facebook?: string
        }
    }
}

export interface SearchVideo {
    id: number;
    hash_id: string;
    description: string;
    title: string;
    url: string;
    views: number;
    likes: number;
    duration: number;
    thumbnail: string;
    preview?: string;
    frame: string;
    publish_at: Date;
    uploader: {
        id: string;
        name: string;
        username: string;
        icon: string;
        is_official: boolean;
    };
}

export interface GetVideo {
    id: number;
    hash_id: string;
    description: string;
    title: string;
    url: string;
    tags: Tag[];
    views: number;
    likes: number;
    duration: number;
    thumbnail: string;
    preview?: string;
    frame: string;
    publish_at: Date;
    uploader: {
        id: string;
        name: string;
        username: string;
        icon: string;
    };
    is_download_able: boolean;
    download_link: string;
    download_links: Array<{ quality: string; url: string; }>
}
/**
 * @copyright
 * Code by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * Developed for Persian Caesar | https://github.com/Persian-Caesar | https://dsc.gg/persian-caesar
 *
 * If you encounter any issues or need assistance with this code,
 * please make sure to credit "Persian Caesar" in your documentation or communications.
 */