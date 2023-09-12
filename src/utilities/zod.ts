import { z } from "zod"

export const safeParseReturn = <T>(result: z.SafeParseReturnType<T, T>) => {
  return {
    data: result.success ? result.data : null,
    error: result.success ? null : parseZodError(result.error),
  }
}

const parseZodError = (error: Zod.ZodError) => {
  const issue = error.issues[0] as Issue
  const { message, path, code, type } = issue

  let msg = ""

  if (code === "invalid_type") msg = getInvalidTypeMessage(issue)
  else if (code === "too_small") msg = message.toLowerCase().replace(type + " ", "")

  return {
    issue,
    message: msg ? `'${path}' ${msg}` : `${message} at '${path}'`,
  }
}

const getInvalidTypeMessage = ({ code, expected, received }: Issue) => {
  if (received === "undefined") return "is required"
  else if (expected !== received) return `should be ${expected}`
  return ""
}

type Issue = Zod.ZodIssue & {
  type: string
  expected: string
  received: string
}
