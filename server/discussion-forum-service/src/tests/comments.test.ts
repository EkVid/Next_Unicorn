import { mockComments, mockPosts } from "../data/mockDatabase";
import mongoose from "mongoose";
import request from "supertest";
import app from "../app";
import "dotenv/config";
import { v4 as uuidv4 } from "uuid";

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_LOCAL!);
});

// POST request tests
describe("POST /api/comments", () => {
  it("creates a comment based on a post", async () => {
    const { created_at, post_id, ...comment_data } = mockComments[0];
    // Create mock post
    const postRes = await request(app).post("/api/posts").send(mockPosts[0]);

    // Create a mock comment for that mock post
    const commentRes = await request(app)
      .post("/api/comments")
      .send({
        ...comment_data,
        post_id: postRes.body._id,
      });

    expect(commentRes.statusCode).toEqual(201);
    expect(commentRes.body.createdComment).toMatchObject({
      ...comment_data,
      post_id: postRes.body._id,
      _id: expect.any(String),
      created_at: expect.any(String),
    });

    // Cleanup
    await request(app).delete(
      `/api/comments/${commentRes.body.createdComment._id}`
    );
    await request(app).delete(`/api/posts/${postRes.body._id}`);
  });

  it("doesn't create comments with invalid data", async () => {
    // Comment with no content/post_id
    const noContent = await request(app).post("/api/comments").send({});
    expect(noContent.statusCode).toEqual(400);

    // Create a mock comment with a fake post_id
    const commentRes = await request(app).post("/api/comments").send({
      post_id: 300,
      user_id: uuidv4(),
      content: "Check out the NextUnicorn. They are great!",
      created_at: new Date().toISOString(),
      likes: 0,
    });

    expect(commentRes.statusCode).toEqual(400);
  });
});

// GET request tests
describe("GET /api/posts", () => {
  it("gets a comment by a Post ID", async () => {
    const { created_at, post_id, ...comment_data } = mockComments[0];
    // Create mock post
    const postRes = await request(app).post("/api/posts").send(mockPosts[0]);
    // Create a mock comment for that mock post
    const commentRes = await request(app)
      .post("/api/comments")
      .send({
        ...comment_data,
        post_id: postRes.body._id,
      });

    // Test if you can get the comment by Post Id
    const postComments = await request(app).get(
      `/api/comments/${postRes.body._id}`
    );
    expect(postComments.body).toContainEqual(
      expect.objectContaining(commentRes.body.createdComment)
    );

    // Cleanup
    await request(app).delete(
      `/api/comments/${commentRes.body.createdComment._id}`
    );
    await request(app).delete(`/api/posts/${postRes.body._id}`);
  });
});

// DELETE request test

describe("DELETE /api/comments", () => {
  it("deletes a comment", async () => {
    const { created_at, post_id, ...comment_data } = mockComments[0];
    // Create mock post
    const postRes = await request(app).post("/api/posts").send(mockPosts[0]);

    // Create a mock comment for that mock post
    const commentRes = await request(app)
      .post("/api/comments")
      .send({
        ...comment_data,
        post_id: postRes.body._id,
      });

    const deletion = await request(app).delete(
      `/api/comments/${commentRes.body.createdComment._id}`
    );
    expect(deletion.statusCode).toEqual(200);

    // Cleanup
    await request(app).delete(`/api/posts/${postRes.body._id}`);
  });
});

afterEach(async () => {
  await mongoose.connection.close();
});
