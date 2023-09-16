import { safeParseReturn } from "../utilities/zod.js"
import { FirestoreDB } from "../utilities/firestore.js"
import { DocData } from "../../types/index.js"
import { z } from "zod"

export class Budget {
  private static colId = "budgets"

  static create(data: InputData) {
    return FirestoreDB.create<BudgetDoc>(Budget.colId, data)
  }

  static find(param: Partial<BudgetDoc> = {}) {
    return FirestoreDB.find<BudgetDoc>(Budget.colId, param)
  }

  static update(id: string, data: Pick<InputData, "name">) {
    return FirestoreDB.update<BudgetDoc>(Budget.colId, id, data)
  }

  static delete(id: string) {
    return FirestoreDB.delete(Budget.colId, id)
  }

  static clear() {
    return FirestoreDB.clear(Budget.colId)
  }

  static validate(data: InputData) {
    return safeParseReturn(Schema.safeParse(data))
  }
}

const Schema = z.object({ name: z.string().min(3), userId: z.string().min(3) })

type InputData = z.infer<typeof Schema>

type BudgetDoc = DocData & InputData
