# Aparat.JS
The aparat website services in one package free to use and more quality.


# Doucement
An example to how catch user information like followers count and etc:
```js
const { Aparat } = require("aparat.js");
const aparat = new Aparat();
(async () => {

    // User information results.
    const user = await aparat.user.search("shervinbdndev");
    console.log(`Followers: ${user.followers.toLocaleString()}`); // Returns: 4
    console.log(`Followings: ${user.followings.toLocaleString()}`); // Returns: 2

})();
```

## User object results:
```json
{
  "description": "درود،\nمن شروین هستم، دانشجوی کارشناسی رشته مهندسی حرفه ای کامپیوتر-نرم افزار ، تو این کانال درباره مباحث برنامه نویسی صحبت میکنم و سعی دارم تا تجربه ام از کار با تکنولوژی ها رو آموزش بدم.",
  "created_at": "2020-01-15",
  "followers": "10 ",
  "followers_int": 10,
  "followings": "7",
  "followings_int": 7,
  "priority": "null",
  "total_video": 37,
  "total_views": "895 ",
  "is_forkids": false,
  "is_banned": false,
  "is_official": false,
  "user": {
    "name": "شروین بدن آرا",
    "username": "shervinbdndev",
    "id": 7093301,
    "hash_id": "8d5f2763430188a563fa6214ed2c45777f7198a6",
    "icon": "https://static.cdn.asset.aparat.com/profile-photo/7093301-467581-b.jpg",
    "cover": null,
    "links": {
      "website": null,
      "twitter": null,
      "lenzor": null,
      "cloob": null,
      "facebook": null
    }
  },
  "live": {
    "is_live": false,
    "url": "https://www.aparat.com/shervinbdndev/live",
    "title": null,
    "description": null,
    "cover": null,
    "donate_link": null,
    "last_start_date": null,
    "last_end_date": null,
    "moderators": [
      []
    ],
    "vip_users": null,
    "tag": {
      "id": null,
      "name": null,
      "type": null,
      "picture": null,
      "is_game": null
    },
    "category": {
      "id": null,
      "name": null
    },
    "chat": {
      "pined_message": null
    }
  }
}
```

## How search a video or get the information from it:
```js
const { Aparat } = require("aparat.js");
const aparat = new Aparat();
(async () => {
    // Searched vidoe results.
    const videos = await aparat.video.search("SpongBob");
    const video = videos[0];
    console.log(video.url); // Returns: https://www.aparat.com/v/eHEjW
})();
```

Results of single video information:
```json
{
 "id": "54992465",
 "hash_id": "n4163y7",
 "title": "بازی ترسناک باب اسفنجی در راک باتم سم کوتاه ! Spongbob Day of Terror",
 "description": "برای دلگرمی بیشتر لطفا هم زنگوله ویدیورو فعال کنید هم شبکه های اجتماعی دنبال کنید عشقید\n\nساعت استریم : هرشب ساعت 9 تا 12 در سایت آپارات\nویدیو جدید کانال هر روز ساعت 9 صبح اپلود میشه\n\nروبینو https://www.rubika.ir/ripbroadcast \nروبیکا https://www.rubika.ir/ripbroadcast11\nیوتیوب www.youtube.com/ripbroadcast\nدیسکوردwww.discord.gg/c4kXV5RHsw\nتوییچ www.twitch.tv/ripbroadcast\nتلگرام t.me/ripbroadcast\nاینستاگرام www.instagram.com/ripbroadcast\nحمایت مالی www.sibmo.ir/ripbroadcast\n\nتگ :\nعمو امیر\nRipbroadcast\nگیم پلی\n",
 "url": "https://www.aparat.com/v/n4163y7",
 "uploader": {
  "name": "Rest in Peace",
  "username": "rest_in_peace",
  "id": "3921056",
  "icon": "https://static.cdn.asset.aparat.com/profile-photo/3921056-851567-m.jpg",
  "is_official": true
 },
 "tags": [
  ""
 ],
 "views": "62.4 هزار",
 "views_int": 62363,
 "likes": 5211,
 "duration": "428",
 "poster": "https://static.cdn.asset.aparat.com/avt/54992465-7970-l__4352.jpg?width=900&quality=90&secret=pNq7PpNOky1WgplrE93-Kw",
 "preview": "https://static.cdn.asset.aparat.com/avt/54992465_15s.mp4",
 "frame": "https://www.aparat.com/video/video/embed/videohash/n4163y7/vt/frame",
 "publish_at": "2023-09-30 09:04:52"
}
```

Results of video search method is an array like the exmple:
```json
[
 {
  "id": "54992465",
  "hash_id": "n4163y7",
  "title": "بازی ترسناک باب اسفنجی در راک باتم سم کوتاه ! Spongbob Day of Terror",
  "description": "برای دلگرمی بیشتر لطفا هم زنگوله ویدیورو فعال کنید هم شبکه های اجتماعی دنبال کنید عشقید\n\nساعت استریم : هرشب ساعت 9 تا 12 در سایت آپارات\nویدیو جدید کانال هر روز ساعت 9 صبح اپلود میشه\n\nروبینو https://www.rubika.ir/ripbroadcast \nروبیکا https://www.rubika.ir/ripbroadcast11\nیوتیوب www.youtube.com/ripbroadcast\nدیسکوردwww.discord.gg/c4kXV5RHsw\nتوییچ www.twitch.tv/ripbroadcast\nتلگرام t.me/ripbroadcast\nاینستاگرام www.instagram.com/ripbroadcast\nحمایت مالی www.sibmo.ir/ripbroadcast\n\nتگ :\nعمو امیر\nRipbroadcast\nگیم پلی\n",
  "url": "https://www.aparat.com/v/n4163y7",
  "uploader": {
   "name": "Rest in Peace",
   "username": "rest_in_peace",
   "id": "3921056",
   "icon": "https://static.cdn.asset.aparat.com/profile-photo/3921056-851567-m.jpg",
   "is_official": true
  },
  "tags": [
   ""
  ],
  "views": "62.4 هزار",
  "views_int": 62363,
  "likes": 5211,
  "duration": "428",
  "poster": "https://static.cdn.asset.aparat.com/avt/54992465-7970-l__4352.jpg?width=900&quality=90&secret=pNq7PpNOky1WgplrE93-Kw",
  "preview": "https://static.cdn.asset.aparat.com/avt/54992465_15s.mp4",
  "frame": "https://www.aparat.com/video/video/embed/videohash/n4163y7/vt/frame",
  "publish_at": "2023-09-30 09:04:52"
 },
 {
  "id": "23725826",
  "hash_id": "r919s4q",
  "title": "SPONGBOB #3 // این سندی مگه دختر نیست؟ / آریا کئوکسر / Aria Keoxer",
  "description": "خب دوستان امیدوارم که خوشتون بیاد دنبالم کنید کامنت بزارین&zwnj; درخواستی هم داشتین تو کامنتا بنویسین مررررسی *-*\n/// یوتیوبر : Aria Keoxer",
  "url": "https://www.aparat.com/v/r919s4q",
  "uploader": {
   "name": "✘ツ♡ ₴Ⱨ₳₮Ʉ฿Ɇ ♡ツ✘",
   "username": "ShaTube",
   "id": "7666432",
   "icon": "https://static.cdn.asset.aparat.com/profile-photo/7666432-386590-m.jpg",
   "is_official": false
  },
  "tags": [
   ""
  ],
  "views": "24.8 هزار",
  "views_int": 24764,
  "likes": 1253,
  "duration": "2309",
  "poster": "https://static.cdn.asset.aparat.com/avt/23725826-5321-l__9043.jpg?width=900&quality=90&secret=njCDZcwDlMtwlZTOzCZyvA",
  "preview": "https://static.cdn.asset.aparat.com/avt/23725826_15s.mp4",
  "frame": "https://www.aparat.com/video/video/embed/videohash/r919s4q/vt/frame",
  "publish_at": "2020-07-10 09:36:16"
 },
 ...
]
```
## Get stream data:
You can check the user profile is it start a stream or not and will be alert to you.
In an event you can have this option and use it like the example:
```js
const { Aparat } = require("aparat.js");
const aparat = new Aparat();
aparat.checkStream("shervinbdndev");
aparat.on("start", async (user) => {
    console.log("User is on the stream:", user.live.url); // Returns: https://www.aparat.com/shervinbdndev/live
});
```

User object is equals with `user.search` object.

## Contatc me:

 <div align="center">
  <a href="http://sobhan.epizy.com" target="_blank">
   <img align="left" src="https://github.com/user-attachments/assets/69b35053-17b1-48c6-a35b-4d3881a4dd2c" width=50%>
  </a>
  <a href="https://t.me/d_opa_mine" target="_blank">
   <img alt="Telegram"
    src="https://img.shields.io/static/v1?message=Telegram&logo=telegram&label=&color=229ED9&logoColor=white&labelColor=&style=flat"
    height="30" />
  </a>
  <a href="https://www.instagram.com/mr.sinre?igsh=cWk1aHdhaGRnOGg%3D&utm_source=qr" target="_blank">
   <img alt="Instagram"
    src="https://img.shields.io/static/v1?message=Instagram&logo=instagram&label=&color=C13584&logoColor=white&labelColor=&style=flat"
    height="30" />
  </a>
  <a href="https://www.twitch.tv/sobhan_srza" target="_blank">
   <img alt="Twitch"
    src="https://img.shields.io/static/v1?message=Twitch&logo=twitch&label=&color=6441A4&logoColor=white&labelColor=&style=flat"
    height="30" />
  </a>
  <a href="https://www.youtube.com/@mr_sinre?app=desktop&sub_confirmation=1" target="_blank">
   <img alt="YouTube"
    src="https://img.shields.io/static/v1?message=YouTube&logo=youtube&label=&color=FF0000&logoColor=white&labelColor=&style=flat"
    height="30" />
  </a>
  <a href="https://github.com/Sobhan-SRZA" target="_blank">
   <img alt="Github"
    src="https://img.shields.io/static/v1?message=Github&logo=github&label=&color=000000&logoColor=white&labelColor=&style=flat"
    height="30" />
  </a>
  </p>
  <p align="left">
   <a href="https://discord.gg/xh2S2h67UW" target="_blank">
    <img src="https://discord.com/api/guilds/1054814674979409940/widget.png?style=banner2" alt="pc-development.png">
   </a>
  </p>
  <p align="right">
   <a href="https://discord.gg/54zDNTAymF" target="_blank">
    <img src="https://discord.com/api/guilds/1181764925874507836/widget.png?style=banner2" alt="pc-club.png">
   </a>
  </p>
  <div align="center">
   <a href="https://discord.com/users/865630940361785345" target="_blank">
    <img alt="My Discord Account" src="https://discord.c99.nl/widget/theme-1/865630940361785345.png" />
   </a>
  </div>
 </div>
