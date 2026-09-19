console.log("-".repeat(50))
console.log(
    "Aparat.js by Sobhan-SRZA from Persian Caesar" + "\n" +
    "\t• Build with Love ❤️" + "\n" +
    "\t• Version 0.1.2 - Playlist update"
);
console.log("-".repeat(50))
console.log("\n")

const { Aparat, VideoQuality } = require("aparat.js"); 
const aparat = new Aparat();

// User information results.
async function getUserProfile(username = "SobhanSRZA") {
    const user = await aparat.user.getProfile(username);

    console.log(`Followers: ${user.followers.toLocaleString()}`); // Followers: 10
    console.log(`Followings: ${user.followings.toLocaleString()}`); // Followings: 7

    return user
}

// Get stream data
function StreamerEvent(username = "shervinbdndev") {
    console.log("Start monitoring user streaming:", username)

    aparat.events.startStreamCheck(username);
    aparat.events.once("live_start", async (user) => {
        console.log("User is on the stream:", user.url); // Returns: https://www.aparat.com/shervinbdndev/live
        aparat.events.stopStreamCheck(username); // Stop the trigger (Note: if you don't stop the trigger it will be spam all the time)
    });
}

// Download the video
async function downloadVideo(hash_id = "n4163y7") {
    // Dowload with custom quality and path
    await aparat.video.download(hash_id, VideoQuality.P360, "./example");

    // Download to path "./" with 720p quality by default
    await aparat.video.download(hash_id);
}

// Search vidoe
async function SearchVideo(query = "SpongBob") {
    const videos = await aparat.video.search(query); // Returns: Array of searched videos
    console.log(JSON.stringify(videos));

    return videos;
}

// Get video by hash id
async function getVideoByHashIdByFirstSearchResualt(hash_id = "n4163y7") {
    const videoData = await aparat.video.get(hash_id); // Returns: Video Object
    console.log(JSON.stringify(videoData));

    return videoData;
}

// Get playlist information
async function getPlaylistById(id = "22350755") {
    const playlist = await aparat.playlist.get(id) // Returns: Playlist Object
    console.log(JSON.stringify(playlist));

    return playlist;
}

async function downloadPlaylist(id = "22350755") {
    // By default playlist videos saves in playlist dir, btw you can use {playlistName} operator for create a directory same name with playlist name.
    // Example:
    await aparat.playlist.download(id, undefined, "./{playlistName}");

    // Dowload with custom quality and path
    await aparat.playlist.download(id, VideoQuality.P360, "./example");

    // Download to path "./playlist" with 720p quality by default
    await aparat.playlist.download(id);
}

// Testing area
const main = async () => {
    // any code you want :)
}

void main();

/**
 * @copyright
 * Code by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * Developed for Persian Caesar | https://github.com/Persian-Caesar | https://dsc.gg/persian-caesar
 *
 * If you encounter any issues or need assistance with this code,
 * please make sure to credit "Persian Caesar" in your documentation or communications.
 */