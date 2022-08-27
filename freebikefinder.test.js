const request = require("supertest");
const server = require("../server");

// Declare the jest will mock movieData. Must be before the require statement.
jest.mock("../dataInterface/shops");
const shopData = require("../dataInterface/shops")

describe("/shops routes", () => {

  beforeEach(() => {

  });

  describe("GET /", () =>{
    it("should return an array on success", async () => {
        shopData.getAllShops.mockResolvedValue([{_id:"890", title:"One Day"}]);

      const res = await request(server).get("/shops");

      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toEqual(true);
      expect(res.body.error).not.toBeDefined();
    });
    it("should return an error message on error", async () => {
        shopData.getAllShops.mockResolvedValue(null);

      const res = await request(server).get("/shops");

      expect(res.statusCode).toEqual(500);
      expect(res.body.error).toBeDefined();
    });
  });

  describe("GET /:id", () =>{
    it("should return a single movie on success", async () => {
      expect(false).toEqual(true);
    });
    it("should return a status code of 404 if movie not found", async () => {
      expect(false).toEqual(true);
    });
  });

  describe("POST /", () =>{
    it("should return the new record on success", async () => {
      expect(false).toEqual(true);
    });
    it("should return an error message if body is missing title", async () => {
      expect(false).toEqual(true);
      // expect status code == 400
    });
    it("should return an error message if record fails to be created", async () => {
      expect(false).toEqual(true);
      // expect status code == 400
    });
  });

  describe("PUT /:id", () =>{
    it("should return the updated record on success", async () => {
      expect(false).toEqual(true);
    });
    it("should return an error message if record fails to be updated", async () => {
      expect(false).toEqual(true);
    });
  });

  describe("DELETE /:id", () =>{
    it("should return a message on success", async () => {
      expect(false).toEqual(true);
    });
    it("should return a error message if record fails to be deleted", async () => {
      expect(false).toEqual(true);
    });
  });

});
