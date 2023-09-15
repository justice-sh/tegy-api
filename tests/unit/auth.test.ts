import { Request, Response } from "express"
import { describe, expect, it, vi } from "vitest"
import auth from "../../src/middlewares/auth"
import { User } from "../../src/models/user"
import app from "../../src/index"

describe("auth middleware", () => {
  it("should populate req.params.user with the payload of a valid JWT", () => {
    app.listen(3005)

    const user = { id: "userid" }
    const token = User.generateAuthToken(user as any)

    const req = { header: vi.fn().mockReturnValue(token), params: {} } as any as Request<{ user: any }>

    const res = {} as Response

    const next = vi.fn()

    auth(req, res, next)

    expect(req.params.user).toMatchObject(user)
  })
})
