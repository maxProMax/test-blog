import { initDatabase } from "./db/init.js";
import { Post } from "./db/models/post.js";

await initDatabase();
const post = new Post({
  title: "H",
  author: "asd",
  contents: "asd",
  tags: ["sa"],
});

const createdPost = await post.save();

const posts = await Post.find();

await Post.findOneAndUpdate(createdPost._id, {
  $set: { contents: "adsadadsasddadsa" },
});

console.log(posts);
