import { ID } from "node-appwrite"
import { BudgetData } from "../../types/tegy.js"
import { dbClient } from "../index.js"

export class Budget {
  private static id = "budgets"
  private static modelName = "Budgets"

  private constructor() {}

  static async create(name: string): Promise<BudgetData> {
    const { db, id } = dbClient
    const response = await db.createDocument(id, Budget.id, ID.unique(), { name })
    return { name, id: response.$id, createdAt: response.$createdAt }
  }

  static async update(budget: Budget) {}

  static async delete(id: string) {}

  static async get(id: string) {}

  static async getAll() {
    return []
  }

  static async createCollection() {
    const { db, id } = dbClient
    await db.createCollection(id, Budget.id, Budget.modelName)
    await db.createStringAttribute(id, Budget.id, "name", 50, true)
  }

  static async deleteCollection() {
    const { db, id } = dbClient
    await db.deleteCollection(id, Budget.id)
  }
}
