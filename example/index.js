const { Aparat } = require("../dist/index"); // const { Aparat } = require("aparat.js");
const aparat = new Aparat();
(async () => {
 // User information results.
 const user = await aparat.user.search("shervinbdndev");
 console.log(`Followers: ${user.followers.toLocaleString()}`); // Followers: 10
 console.log(`Followings: ${user.followings.toLocaleString()}`); // Followings: 7

 // Searched vidoe results.
 const videos = await aparat.video.search("SpongBob");
 const video = videos[0];
 console.log(videos); // Returns: Array
 console.log(video); // Returns: Video Object

 // Get stream data
 await aparat.checkStream("shervinbdndev");
 aparat.on("start", async (user) => {
  console.log("User is on the stream:", user.live.url); // Returns: https://www.aparat.com/shervinbdndev/live
 });
})();