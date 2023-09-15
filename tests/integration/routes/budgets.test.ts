import { afterEach, beforeEach, describe, expect, it } from "vitest"
import request from "supertest"
import { Budget } from "../../../src/models/budget"
import { User } from "../../../src/models/user"
import app from "../../../src/app.js"

describe("/api/budgets", () => {
  afterEach(async () => {
    await Budget.clear()
  })

  describe("GET /:id", () => {
    it("should return 404 if budget with given ID was not found", async () => {
      const res = await request(app).get("/api/budgets/dkdk")

      expect(res.status).toBe(404)
    })

    it("should return a single budget", async () => {
      const budget = await Budget.create({ name: "budget1", userId: "user1" })

      const [found] = await Budget.find({ id: budget.id })
      console.log(budget.id, found.id, budget.id === found.id)

      const res = await request(app).get("/api/budgets/" + budget.id)

      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty("name", "budget1")
    })
  })

  describe("GET /", () => {
    it("should return all budgets", async () => {
      await Promise.all([
        Budget.create({ name: "budget1", userId: "user1" }),
        Budget.create({ name: "budget2", userId: "user2" }),
      ])

      const res = await request(app).get("/api/budgets")

      expect(res.status).toBe(200)
      expect(res.body.length).toBe(2)

      expect(res.body[0]).not.toHaveProperty("userId")
      expect(res.body[1]).not.toHaveProperty("userId")

      expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ name: "budget1" }),
          expect.objectContaining({ name: "budget2" }),
        ])
      )
    })
  })

  describe("POST /", () => {
    let name = "",
      userId = "",
      token = ""

    const exec = () => request(app).post("/api/budgets").set("x-auth-token", token).send({ name, userId })

    beforeEach(() => {
      name = "budget1"
      userId = "user1"
      token = User.generateAuthToken({ id: "kdkd" } as any)
    })

    it("should return 401 if client is not logged in", async () => {
      token = ""

      const res = await exec()

      expect(res.status).toBe(401)
    })

    it("should return 400 if name is less than 3 characters", async () => {
      name = "na"

      const res = await exec()

      expect(res.status).toBe(400)
    })

    it("should return 400 if userId is not provided", async () => {
      userId = ""

      const res = await exec()

      expect(res.status).toBe(400)
    })

    it("should save budget if valid", async () => {
      const res = await exec()

      const [budget] = await Budget.find({ name })

      expect(res.status).toBe(200)
      expect(res.body).toEqual(expect.objectContaining({ name, id: budget.id }))
      expect(res.body).not.toHaveProperty("userId")
    })
  })

  describe("PUT /", () => {
    let name = "",
      token = "",
      id = "123"

    const exec = () =>
      request(app)
        .put("/api/budgets/" + id)
        .set("x-auth-token", token)
        .send({ name })

    beforeEach(() => {
      name = "budget1 updated"
      token = User.generateAuthToken({ id: "kdkd" } as any)
    })

    it("should return 401 if client is not logged in", async () => {
      token = ""

      const res = await exec()

      expect(res.status).toBe(401)
    })

    it("should return 400 if name is less than 3 characters", async () => {
      name = "na"

      const res = await exec()

      expect(res.status).toBe(400)
    })

    it("should return 400 if item with given ID does not exist", async () => {
      id = "k"

      const res = await exec()

      expect(res.status).toBe(400)
    })

    it("should update budget if valid", async () => {
      const budgetToUpdate = await Budget.create({ name: "budget1", userId: "user1" })
      id = budgetToUpdate.id

      const res = await exec()

      const [budget] = await Budget.find({ name })

      expect(res.status).toBe(200)
      expect(res.body).toEqual(expect.objectContaining({ name, id: budget.id }))
      expect(res.body).not.toHaveProperty("userId")
    })
  })

  describe("DELETE /:id", () => {
    let name = "",
      token = "",
      id = "123"

    const exec = () =>
      request(app)
        .delete("/api/budgets/" + id)
        .set("x-auth-token", token)

    beforeEach(() => {
      name = "budget1"
      token = User.generateAuthToken({ id: "user1" } as any)
    })

    it("should return 401 if client is not logged in", async () => {
      token = ""

      const res = await exec()

      expect(res.status).toBe(401)
    })

    it("should delete budget", async () => {
      const budget = await Budget.create({ name, userId: "user1" })
      id = budget.id

      const res = await exec()

      expect(res.status).toBe(200)
    })
  })
})
