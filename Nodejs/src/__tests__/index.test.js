import request from "supertest";
import app from "../index";

describe("POST /api/search", () => {
  describe("given a good value to find users", () => {
    it("should responde with 200 status code", async () => {
      const response = await request(app).post("/api/search").send({
        searchName: "antoine",
        searchTarget: "users",
        pageRange: 1,
      });
      expect(response.statusCode).toBe(200);
    });
    it("should responde with 200 status code", async () => {
      const response = await request(app).post("/api/search").send({
        searchName: "antoine",
        searchTarget: "repositories",
        pageRange: 1,
      });
      expect(response.statusCode).toBe(200);
    });
    it("should responde with 200 status code", async () => {
      const response = await request(app).post("/api/search").send({
        searchName: "antoine",
        searchTarget: "issues",
        pageRange: 1,
      });
      expect(response.statusCode).toBe(200);
    });
    it("should specify json in the content type header", async () => {
      const response = await request(app).post("/api/search").send({
        searchName: "antoine",
        searchTarget: "users",
        pageRange: 1,
      });
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });
  });

  describe("given a bad value to find users", () => {});
  it("should responde with 200 status code", async () => {
    const response = await request(app).post("/api/search").send({
      searchName: "antoineasdasdasdasdasdasdsada",
      searchTarget: "users",
      pageRange: 1,
    });
    expect(response.statusCode).toBe(404);
  });
  it("should responde with 200 status code", async () => {
    const response = await request(app).post("/api/search").send({
      searchName: "antoineasdasdasdasdasdasdsada",
      searchTarget: "repositories",
      pageRange: 1,
    });
    expect(response.statusCode).toBe(404);
  });
  it("should responde with 200 status code", async () => {
    const response = await request(app).post("/api/search").send({
      searchName: "antoineasdasdasdasdasdasdsada",
      searchTarget: "issues",
      pageRange: 1,
    });
    expect(response.statusCode).toBe(404);
  });
  it("should responde with 200 status code", async () => {
    const response = await request(app).post("/api/search").send({
      searchName: undefined,
      searchTarget: undefined,
      pageRange: undefined,
    });
    expect(response.statusCode).toBe(400);
  });
});
