import { mockPosts } from "../data/mockDatabase";
import mongoose from "mongoose";
import request from "supertest";
import app from "../app";
import "@dotenvx/dotenvx/config";

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_CONNECTION!);
});

// POST request tests
describe("POST /api/posts", () => {
  it("creates a Post", async () => {
    const { created_at, updated_at, ...post_data } = mockPosts[0];

    const res = await request(app).post("/api/posts").send(mockPosts[0]);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toMatchObject({
      ...post_data,
      _id: expect.any(String),
      created_at: expect.any(String),
      updated_at: expect.any(String),
    });

    // This is technically a two-in-one test, only because we have to cleanup
    const deletion = await request(app).delete(`/api/posts/${res.body._id}`);
    expect(deletion.status).toEqual(200);
  });

  it("fails since Post data is bad", async () => {
    const { title, content, ...post_data } = mockPosts[0];
    const res = await request(app)
      .post("/api/posts")
      .send({
        ...post_data,
      });
    expect(res.statusCode).toEqual(400);
  });
});

// GET request tests
describe("GET /api/posts", () => {
  it("gets all Posts", async () => {
    const res = await request(app).get("/api/posts");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(0);
  });

  it("gets a created Post by Post ID", async () => {
    const { created_at, updated_at, ...post_data } = mockPosts[0];

    // Create a post, then retreive it
    const newPost = await request(app).post("/api/posts").send(mockPosts[0]);

    // Main test
    const res = await request(app).get(`/api/posts/${newPost.body._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject({
      ...post_data,
      _id: expect.any(String),
      created_at: expect.any(String),
      updated_at: expect.any(String),
    });

    //Cleanup
    const deletion = await request(app).delete(`/api/posts/${res.body._id}`);
    expect(deletion.status).toEqual(200);
  });

  it("get's a created post by User ID", async () => {
    const { created_at, updated_at, ...post_data } = mockPosts[0];

    // Create a post, then retreive it
    const newPost = await request(app).post("/api/posts").send(mockPosts[0]);

    // Main test
    const res = await request(app).get(
      `/api/posts/user/${newPost.body.user_id}`
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toContainEqual(
      expect.objectContaining({
        ...post_data,
        __v: expect.any(Number),
        _id: expect.any(String),
        created_at: expect.any(String),
        updated_at: expect.any(String),
      })
    );

    //Cleanup
    const deletion = await request(app).delete(
      `/api/posts/${newPost.body._id}`
    );
    expect(deletion.status).toEqual(200);
  });
});

// PATCH tests
describe("PATCH /api/posts", () => {
  it("updates a created post", async () => {
    const { created_at, updated_at, likes, ...post_data } = mockPosts[0];
    const res = await request(app).post("/api/posts").send(mockPosts[0]);

    const updateRes = await request(app)
      .patch(`/api/posts/${res.body._id}`)
      .send({ likes: 1 });

    expect(updateRes.statusCode).toEqual(200);
    expect(updateRes.body).toMatchObject({
      ...post_data,
      likes: 1,
      _id: expect.any(String),
      created_at: expect.any(String),
      updated_at: expect.any(String),
    });
    const deletion = await request(app).delete(`/api/posts/${res.body._id}`);
    expect(deletion.status).toEqual(200);
  });
});

afterEach(async () => {
  await mongoose.connection.close();
});
