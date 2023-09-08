import { ID } from "node-appwrite"
import { BudgetData } from "../../types/tegy.js"
import { getDBClient } from "../utilities/db.js"

export class Budget {
  private static id = "budgets"
  private static modelName = "Budgets"

  private constructor() {}

  static async create(name: string): Promise<BudgetData> {
    const db = getDBClient()
    const response = await db.handle.createDocument(db.id, Budget.id, ID.unique(), { name })
    return { name, id: response.$id, createdAt: response.$createdAt }
  }

  static async update(budget: Budget) {}

  static async delete(id: string) {}

  static async get(id: string) {}

  static async getAll() {
    return []
  }

  static async createCollection() {
    const db = getDBClient()
    await db.handle.createCollection(db.id, Budget.id, Budget.modelName)
    await db.handle.createStringAttribute(db.id, Budget.id, "name", 50, true)
  }

  static async deleteCollection() {
    const db = getDBClient()
    await db.handle.deleteCollection(db.id, Budget.id)
  }
}
