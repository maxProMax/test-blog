import mongoose from "mongoose";
import { describe, expect, test, beforeEach } from "@jest/globals";
import {
  createPost,
  deletePost,
  getPostById,
  listAllPosts,
  listPostByTag,
  listPostsByAuthor,
  updatePost,
} from "../services/post";
import { Post } from "../db/models/post";

const samplePosts = [
  { title: "a", author: "b", tags: ["1"] },
  { title: "a2", author: "b", tags: ["2"] },
  { title: "a3" },
];

let createsSamplePosts = [];

beforeEach(async () => {
  await Post.deleteMany({});
  createsSamplePosts = [];

  for (const post of samplePosts) {
    const createPost = new Post(post);
    createsSamplePosts.push(await createPost.save());
  }
});
describe("create post", () => {
  test("with all parameters should succeed", async () => {
    const post = {
      title: "asd",
      author: "asd",
      contents: "asds",
      tags: ["ads"],
    };

    const createdPost = await createPost(post);

    expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId);

    const foundPost = await Post.findById(createdPost._id);

    expect(foundPost).toEqual(expect.objectContaining(post));
    expect(foundPost.createdAt).toBeInstanceOf(Date);
  });

  test("fail", async () => {
    const post = {
      title: "asd",
      author: "asd",
      contents: "asds",
      tags: ["ads"],
    };

    try {
      await createPost(post);
    } catch (error) {
      expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(error.message).toContain("`title` is req");
    }
  });
  test("with minimal parameters should succeed", async () => {
    const post = {
      title: "asd",
    };

    const createdPost = await createPost(post);

    expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId);
  });
});

describe("listing post", () => {
  test("should return all posts", async () => {
    const posts = await listAllPosts();
    expect(posts.length).toEqual(createsSamplePosts.length);
  });

  test("sorted by creation date descending", async () => {
    const posts = await listAllPosts();
    const sortedSamplePosts = createsSamplePosts.sort(
      (a, b) => b.createdAt - a.createdAt
    );

    expect(posts.map((p) => p.createdAt)).toEqual(
      sortedSamplePosts.map((p) => p.createdAt)
    );
  });

  test("sorted by options", async () => {
    const posts = await listAllPosts({
      sortBy: "updateAt",
      sortOrder: "ascending",
    });
    const sortedSamplePosts = createsSamplePosts.sort(
      (a, b) => a.updateAt - b.updateAt
    );

    expect(posts.map((p) => p.updatedAt)).toEqual(
      sortedSamplePosts.map((a) => a.updatedAt)
    );
  });

  test("filter by author", async () => {
    const posts = await listPostsByAuthor("b");

    expect(posts.length).toBe(2);
  });

  test("by tags", async () => {
    const posts = await listPostByTag("2");

    expect(posts.length).toBe(1);
  });
});

describe("getting a post", () => {
  test("return full post", async () => {
    const post = await getPostById(createsSamplePosts[0]._id);

    expect(post.toObject()).toEqual(createsSamplePosts[0].toObject());
  });

  test("fail if id not exists", async () => {
    const post = await getPostById("000000000000000000000000");
    expect(post).toBeNull();
  });
});

describe("update posts", () => {
  test("should update", async () => {
    await updatePost(createsSamplePosts[0]._id, { author: "C" });

    const updatedPost = await getPostById(createsSamplePosts[0]._id);
    expect(updatedPost.author).toBe("C");
    expect(updatedPost.title).toBe("a");
    expect(updatedPost.updatedAt.getTime()).toBeGreaterThan(
      createsSamplePosts[0].updatedAt.getTime()
    );
  });

  test("fail", async () => {
    const post = await updatePost("000000000000000000000000", {
      author: "test",
    });
    expect(post).toBeNull();
  });
});

describe("delete", () => {
  test("remove", async () => {
    const result = await deletePost(createsSamplePosts[0]._id);

    expect(result.deletedCount).toBe(1);

    const deletedPost = await getPostById(createsSamplePosts[0]._id);

    expect(deletedPost).toBeNull();
  });

  test("fail", async () => {
    const result = await deletePost("000000000000000000000000");

    expect(result.deletedCount).toBe(0);
  });
});
