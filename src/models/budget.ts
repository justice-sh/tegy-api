import { ID } from "node-appwrite"
import { BudgetData } from "../../types/tegy.js"
import { getDBClient } from "../utilities/db.js"

export class Budget {
  private static id = "budgets"
  private static modelName = "Budgets"

  private constructor() {}

  static async create(name: string): Promise<BudgetData> {
    const { db, dbId } = getDBClient()
    const response = await db.createDocument(dbId, Budget.id, ID.unique(), { name })
    return { name, id: response.$id, createdAt: response.$createdAt }
  }

  static async update(budget: Budget) {}

  static async delete(id: string) {}

  static async get(id: string) {}

  static async getAll() {
    return []
  }

  static async createCollection() {
    const { db, dbId } = getDBClient()
    await db.createCollection(dbId, Budget.id, Budget.modelName)
    await db.createStringAttribute(dbId, Budget.id, "name", 50, true)
  }

  static async deleteCollection() {
    const { db, dbId } = getDBClient()
    await db.deleteCollection(dbId, Budget.id)
  }
}
