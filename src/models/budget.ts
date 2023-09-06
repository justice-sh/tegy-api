import { ID } from "node-appwrite"
import { Budget } from "../../types/tegy.js"
import { databaseClient } from "../index.js"

export class BudgetModel {
  private static instance: BudgetModel | undefined

  private id = "budgets"
  private name = "Budgets"

  private constructor() {}

  public static getInstance() {
    if (!BudgetModel.instance) BudgetModel.instance = new BudgetModel()

    return BudgetModel.instance
  }

  async createCollection() {
    try {
      const { db, id } = databaseClient
      await db.createCollection(id, this.id, this.name)
      await db.createStringAttribute(id, this.id, "name", 50, true)
    } catch (error: any) {
      // 409 means the collection already exists
      if (error.response) {
        if (error.response?.code !== 409) console.log(error.response)
      } else {
        throw error
      }
    }
  }

  async deleteCollection() {
    try {
      const { db, id } = databaseClient
      await db.deleteCollection(id, this.id)
    } catch (error: any) {
      // 409 means the collection already exists
      // if (error.response.code !== 409) console.log(error.response)
      console.log(error.response)
    }
  }

  async create(name: string): Promise<Budget> {
    try {
      const { db, id } = databaseClient
      const response = await db.createDocument(id, this.id, ID.unique(), { name })
      return { name, id: response.$id, createdAt: response.$createdAt }
    } catch (error: any) {
      if (error.response?.code === 404) {
        await this.createCollection()
        return this.create(name)
      } else throw error
    }
  }

  static update(budget: BudgetModel) {}

  static delete(id: string) {}

  static get(id: string) {}

  static getAll() {
    return []
  }
}

export const budetModel = BudgetModel.getInstance()
