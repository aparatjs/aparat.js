import { YesOrNo } from "../types";

export interface ApiVideoSearchV1Response {
    data: Row[];
    included: Included[];
    meta: Meta;
}

interface Row {
    type: "Row";
    id: number;
    attributes: RowAttributes;
    relationships: RowRelationships;
}

interface RowAttributes {
    id: number;
    title: Title;
    output_type: string;
    theme: string;
    more_type: string;
    line_count: number;
    total: number;
    button: null;
    dataSource_type: string;
    dataSource_key: string;
    rand_data: boolean;
    limit: number;
    link: Link;
    link_dsp_ads: string;
    ads: boolean;
    caption: null;
    play_all: null;
}

interface Title {
    text: string;
    caption: null;
}

interface Link {
    next: string;
}

interface RowRelationships {
    video: {
        data: VideoRelationship[];
    };
}

interface VideoRelationship {
    type: "Video";
    id: string;
}

type Included = VideoIncluded | ChannelIncluded;

interface VideoIncluded {
    type: "Video";
    id: string;
    attributes: VideoAttributes;
    relationships: {
        channel: {
            data: ChannelRelationship;
        };
    };
}

interface VideoAttributes {
    id: string;
    title: string;
    description: string;
    username: string;
    userid: string;
    tags: string[];
    uid: string;
    isHidden: boolean;
    visit_cnt: string;
    visit_cnt_int: string;
    process: string;
    sender_name: string;
    big_poster: string;
    small_poster: string;
    medium_poster: string;
    profilePhoto: string;
    duration: string;
    date_exact: string;
    sdate: string;
    sdate_rss: string;
    sdate_timediff: number;
    frame: string;
    official: YesOrNo;
    autoplay: boolean;
    "360d": null;
    brand_priority: string;
    like_cnt: string;
    preview_src: string;
    file_link_all: null;
    file_link: null;
    videovisit: null;
    like: {
        cnt: string;
    };
    share: null;
    meta: null;
    catId: string;
    hd: string;
    sensitive: boolean;
    content_type: null;
    isCompany: boolean;
    isAbroad: boolean;
    link_add_watch_later: string;
    hls_link: string;
    watch: Watch;
}

interface Watch {
    watchTimeMinStr: string;
    durationPercentWatch: number;
    avgWatchDuration: number;
    avgWatchDurationLabel: string;
    text: string;
    monthWatch: string;
}

interface ChannelRelationship {
    type: "channel";
    id: string;
}

interface ChannelIncluded {
    type: "channel";
    id: string;
    attributes: ChannelAttributes;
}

interface ChannelAttributes {
    id: string;
    username: string;
    brand_priority: string;
    caption: null;
    avatar: string;
    name: string;
    displayName: string;
    follower_cnt: string;
    priority: null;
    priority_type: null;
    link: string;
    pic: string;
    income_type: null;
    sdate: null;
    message_cnt: null;
}

interface Meta {
    link_collect_data: string;
    uuid: string;
}
/**
 * @copyright
 * Code by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * Developed for Persian Caesar | https://github.com/Persian-Caesar | https://dsc.gg/persian-caesar
 *
 * If you encounter any issues or need assistance with this code,
 * please make sure to credit "Persian Caesar" in your documentation or communications.
 */