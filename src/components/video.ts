import error from "./error";
import { Video, VideoAPI, VideoAPIHash, } from "./types";

export default class {

    /**
     * 
     * @param {string} args 
     * 
     * @description 
     * Search for a videos with name or tag and returns the videos information in Array.
     * 
     * @example
     * ```js
     * const { Aparat } = require("aparat.js");
     * const aparat = new Aparat();
     * (async () => {
     *  // Searched vidoe results.
     *  const videos = await aparat.video.search("SpongBob");
     *  console.log(videos);
     * })(); 
     * ``` 
     */
    async search(args: string): Promise<Video[]> {
        async function videos() {
            try {
                const
                    url = `https://www.aparat.com/api/fa/v1/video/video/search/text/${args}/?type_search=search`,
                    res = await fetch(url).then(res => res.json()),
                    results: Video[] = [];

                await res.included.forEach(async (element: VideoAPI) => {
                    // const
                    //     res1 = await fetch(`https://www.aparat.com/etc/api/video/videohash/${element.attributes.uid}`).then(res => res.json()),
                    //     vidoeHash: VideoAPIHash = await res1.video;

                    results.push({
                        id: element.attributes.id,
                        hash_id: element.attributes.uid,
                        title: element.attributes.title,
                        description: element.attributes.description,
                        url: `https://www.aparat.com/v/${element.attributes.uid}`,
                        uploader: {
                            name: element.attributes.sender_name,
                            username: element.attributes.username,
                            id: element.attributes.userid,
                            icon: element.attributes.profilePhoto,
                            is_official: element.attributes.official == "no" ? false : true
                        },
                        tags: element.attributes.tags,
                        views: element.attributes.visit_cnt,
                        views_int: Number(element.attributes.visit_cnt_int),
                        likes: Number(element.attributes.like_cnt),
                        duration: element.attributes.duration,
                        poster: element.attributes.big_poster,
                        preview: element.attributes.preview_src,
                        frame: element.attributes.frame,
                        publish_at: element.attributes.sdate_rss
                    });
                });
                return results;
            } catch (e: any) {
                if (e.stack.includes("Unexpected token"))
                    return await videos();

                if (e.name.startsWith("TypeError: fetch failed"))
                    throw new error("Connection Error \n" + e);

                if (e.stack.includes("404"))
                    throw new error("Video not found OwO");

                throw new error("Unexpected Error OwO\n" + e);
            }
        };
        return await videos();
    }
};
/**
 * @copyright
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @copyright
 */