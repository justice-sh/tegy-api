import winston from "winston"
import { Budget } from "../models/budget.js"
import { getDBClient } from "../utilities/db.js"

export default async function () {
  const db = getDBClient()

  await trycatch(() => db.handle.create(db.id, db.name)) // Create the database if it doesn't exist.

  // Create the collections, if they don't exist.
  await Promise.all([trycatch(Budget.createCollection)])

  winston.info(`Database "${db.name}" is ready and operational!`) // This line doesn't get called when an error occurs, even though it's caught.
}

async function trycatch(fn: () => Promise<any>) {
  try {
    await fn()
  } catch (error: any) {
    if (error.response?.code !== 409) throw error
  }
}
