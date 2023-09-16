import { Request } from "express"
import { describe, expect, test, vi } from "vitest"
import error from "../../../src/middlewares/error"
import app from "../../../src/app.js"

describe("error middleware", () => {
  // The line below is necessary. We need it to load the app.
  // If you comment it out this test will fail. Try and see.
  const server = app

  const req = {} as any as Request

  const res = {
    status: vi.fn().mockReturnValue({ send: vi.fn() }),
  }

  const next = vi.fn()

  test("should call status() with 400 if err.code is equal to 5", () => {
    const err = { code: 5, error: "from test", detail: "not found error" }

    error(err, req, res as any, next)

    expect(res.status).toHaveBeenCalledWith(400)
  })

  test("should call status() with 500", () => {
    const err = { message: "from test" }

    error(err, req, res as any, next)

    expect(res.status).toHaveBeenCalledWith(500)
  })
})
