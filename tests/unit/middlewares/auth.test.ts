import { Request, Response } from "express"
import { describe, expect, test, vi } from "vitest"
import auth from "../../../src/middlewares/auth"
import { User } from "../../../src/models/user"
import app from "../../../src/app.js"

describe("auth middleware", () => {
  test("should populate req.params.user with the payload of a valid JWT", () => {
    // The line below is necessary. We need it to load the app and essentially, env vars
    // If you comment it out this test will fail. Try and see.
    const server = app

    const user = { id: "userid" }
    const token = User.generateAuthToken(user as any)

    const req = { header: vi.fn().mockReturnValue(token), params: {} } as any as Request<{ user: any }>

    const res = {} as Response

    const next = vi.fn()

    auth(req, res, next)

    expect(req.params.user).toMatchObject(user)
  })
})
