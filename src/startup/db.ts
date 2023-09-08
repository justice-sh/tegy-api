import winston from "winston"
import { config } from "../config/index.js"
import { Budget } from "../models/budget.js"
import { getDBClient } from "../utilities/db.js"

export default async function () {
  const db = getDBClient()

  await db.handle.create(db.id, db.name) // Create the database, if it doesn't exist.

  await Promise.all([Budget.createCollection()]) // Create the collections, if they don't exist.

  winston.info(`Connected to ${db.name}...`)
}
