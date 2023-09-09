import { afterEach, describe, expect, it } from "vitest"
import request from "supertest"
import server from "../../src/index.js"

describe("/api/budgets", () => {
  afterEach(() => {
    server.close()
  })

  describe("GET /", () => {
    it("should return all genres", async () => {
      const res = await request(server).get("/api/budgets")
      expect(res.status).toBe(200)
    })
  })
})
