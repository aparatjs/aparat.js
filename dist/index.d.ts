import { EventEmitter } from 'events';

interface Tag {
    name: string;
    video_cnt: string;
}

interface StreamProfile {
    url: string;
    title: string | null;
    description: string | null;
    cover: string | null;
    donate_link: string | null;
    last_start_date: string | null;
    last_end_date: string | null;
    moderators: any | null;
    vip_users: any | null;
    tag: {
        id: number | null;
        name: string | null;
        type: string | null;
        picture: string | null;
        is_game: boolean | null;
    };
    category: {
        id: number | null;
        name: string | null;
    };
    chat: {
        pined_message: string | null;
    };
}
interface Profile {
    description: string;
    created_at: Date;
    followers: number;
    followings: number;
    priority?: string;
    total_video: number;
    total_views: number;
    month_views: number;
    is_forkids: boolean;
    is_banned: boolean;
    is_official: boolean;
    user: {
        name: string;
        username: string;
        id: number;
        hash_id: string;
        icon: string;
        cover?: string;
        links?: {
            website?: string;
            twitter?: string;
            instagram?: string;
            telegram?: string;
            facebook?: string;
        };
    };
}
interface SearchVideo {
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
interface GetVideo {
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
    download_links: Array<{
        quality: string;
        url: string;
    }>;
}

type AparatEventTypes = {
    "live_start": [streamer: StreamProfile];
    "error": [error: Error];
};

declare enum ErrorCodes {
    NETWORK_ERROR = 1000,
    HTTP_ERROR = 1001,
    USER_NOT_FOUND = 2001,
    VIDEO_NOT_FOUND = 3001,
    RATE_LIMIT_EXCEEDED = 4001,
    AUTH_FAILED = 5001,
    WEBHOOK_ERROR = 6001,
    SEARCH_ERROR = 7001,
    DOWNLOAD_ERROR = 8001
}
declare enum BaseApiUrlTypes {
    ApiV1 = "API_V1_URL",
    ApiV2 = "API_V2_URL",
    ApiBase = "API_BASE_URL"
}
declare enum VideoQuality {
    P144 = "144p",
    P240 = "240p",
    P360 = "360p",
    P480 = "480p",
    P720 = "720p",
    P1080 = "1080p",
    P1440 = "1440p",
    P2160 = "2160p",// 4K
    P4320 = "4320p"
}

declare class ApiService {
    private rateLimit;
    private lastRequestTime;
    constructor();
    /**
     * Makes a fetch request to the specified API endpoint with rate limiting.
     * @param baseURL - The base URL type of the API.
     * @param endpoint - The specific API endpoint to call.
     * @param init - Optional fetch initialization parameters.
     * @returns A promise resolving to the response data of type T.
     * @throws {APIError} Throws an APIError if the request fails or the response is not OK.
     */
    fetch<T>(baseURL: BaseApiUrlTypes, endpoint: string, init?: RequestInit): Promise<T>;
    /**
     * Handles errors by wrapping them in an APIError if necessary.
     * @param error - The error to handle.
     * @returns An instance of APIError.
     */
    private handleError;
}

declare class UserService {
    private api;
    constructor(api: ApiService);
    /**
     * Retrieves the profile information of a user using two different API endpoints.
     * The first API call gets detailed profile attributes and the second provides additional link data.
     *
     * @param username - The username of the user.
     * @returns A Promise that resolves to a Profile object containing user details.
     * @throws APIError if the user is not found or an HTTP error occurs.
     */
    getProfile(username: string): Promise<Profile>;
    /**
     * Checks if a user is currently live streaming.
     *
     * @param username - The username of the user.
     * @returns A Promise that resolves to a boolean indicating if the user is live.
     */
    isStream(username: string): Promise<boolean>;
    /**
     * Retrieves the live stream profile details for a user if they are currently streaming.
     *
     * @param username - The username of the user.
     * @returns A Promise that resolves to a StreamProfile object if streaming; otherwise, null.
     */
    getStreamProfile(username: string): Promise<StreamProfile | null>;
}

declare class AparatEventEmitter extends EventEmitter<AparatEventTypes> {
    private userService;
    private activeListeners;
    constructor(userService: UserService);
    /**
     * Starts a periodic check to see if a user is live streaming.
     * It checks immediately and then at every specified interval.
     * Emits a "live_start" event if the user is streaming.
     *
     * @param username - The username to monitor for live streams.
     * @param interval - Time in milliseconds between checks (default: 30000ms).
     */
    startStreamCheck(username: string, interval?: number): void;
    /**
     * Stops the periodic live stream check for a specified user.
     *
     * @param username - The username whose live stream check should be stopped.
     */
    stopStreamCheck(username: string): void;
}

declare class VideoService {
    private api;
    constructor(api: ApiService);
    /**
     * Searches for videos matching a query string.
     * It filters and maps the API response to an array of SearchVideo objects.
     *
     * @param query - The search term used to find videos.
     * @returns A Promise that resolves to an array of SearchVideo objects.
     */
    search(query: string): Promise<Array<SearchVideo>>;
    /**
     * Retrieves detailed information about a video by its hash.
     *
     * @param hash - The unique hash identifier for the video.
     * @returns A Promise that resolves to a GetVideo object containing video details.
     */
    get(hash: string): Promise<GetVideo>;
    /**
     * Downloads a video file by streaming it from a provided download URL.
     * It checks for download availability and selects the appropriate quality.
     *
     * @param hash - The unique hash of the video.
     * @param quality - The desired video quality (default is P720).
     * @param outputPath - The file path prefix where the video will be saved.
     * @returns A Promise that resolves when the video is successfully downloaded.
     */
    download(hash: string, quality?: VideoQuality, outputPath?: string): Promise<void>;
}

declare class Aparat {
    readonly user: UserService;
    readonly video: VideoService;
    readonly events: AparatEventEmitter;
    constructor();
}

export { Aparat, BaseApiUrlTypes, ErrorCodes, VideoQuality };
