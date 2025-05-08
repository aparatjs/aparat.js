import { StreamProfile } from "./interfaces";

export type AparatEventTypes = {
    "live_start": [streamer: StreamProfile];
    "error": [error: Error];
}

export type YesOrNo = "no" | "yes";
/**
 * @copyright
 * Code by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * Developed for Persian Caesar | https://github.com/Persian-Caesar | https://dsc.gg/persian-caesar
 *
 * If you encounter any issues or need assistance with this code,
 * please make sure to credit "Persian Caesar" in your documentation or communications.
 */