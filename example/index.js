console.log("Aparat.js by Persian Caesar and Sobhan-SRZA\tBuild with Love♥");

const { Aparat, VideoQuality } = require("../dist/index"); // const { Aparat } = require("aparat.js");
const aparat = new Aparat();

// User information results.
async function getUserProfile(username = "SobhanSRZA") {
 const user = await aparat.user.getProfile("sobhansrza");
 console.log(`Followers: ${user.followers.toLocaleString()}`); // Followers: 10
 console.log(`Followings: ${user.followings.toLocaleString()}`); // Followings: 7
}

// Get stream data
function StreamerEvent() {
 aparat.events.startStreamCheck("shervinbdndev");
 aparat.events.once("live_start", async (user) => {
  console.log("User is on the stream:", user.url); // Returns: https://www.aparat.com/shervinbdndev/live
  aparat.events.stopStreamCheck("shervinbdndev"); // Stop the trigger (Note: if you don't stop the trigger it will be spam all the time)
 });
}

// Download the video
async function downloadVideo(hash_id = "n4163y7") {
 // Dowload with custom quality and path
 await aparat.video.download(hash_id, VideoQuality.P360, "./example/video.mp4");

 // Download to path "./" with 720p quality by default
 await aparat.video.download(hash_id);
}

// Search vidoe
async function SearchVideo(query = "SpongBob") {
 const videos = await aparat.video.search(query); // Returns: Array of searched videos

 return videos;
}

// Get video by hash id
async function getVideoByHashIdByFirstSearchResualt(hash_id = "n4163y7") {
 const videoData = await aparat.video.get(hash_id); // Returns: Video Object
 console.log(JSON.stringify(videoData));

 return videoData;
}

// Testing area
(async () => {
 // any code you want :)
})();
/**
 * @copyright
 * Code by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * Developed for Persian Caesar | https://github.com/Persian-Caesar | https://dsc.gg/persian-caesar
 *
 * If you encounter any issues or need assistance with this code,
 * please make sure to credit "Persian Caesar" in your documentation or communications.
 */