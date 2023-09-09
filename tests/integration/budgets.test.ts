import { afterEach, describe, expect, it } from "vitest"
import request from "supertest"
import { Budget } from "../../src/models/budget"
import server from "../../src/index.js"

describe("/api/budgets", () => {
  afterEach(async () => {
    // await Budget.deleteAll()
  })

  describe("GET /", () => {
    it("should return all budgets", async () => {
      Budget.insertMany([
        { name: "budget1", userId: "user1" },
        { name: "budget2", userId: "user2" },
      ])

      // const res = await Budget.getAll()

      // console.log(res)

      // const res = await request(server).get("/api/budgets")
      // expect(res.status).toBe(200)
      // expect(res.body.length).toBe(2)
    })
  })
})
