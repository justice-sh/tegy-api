import { safeParseReturn } from "../utilities/zod.js"
import { FirestoreDB } from "../utilities/firestore.js"
import { DocData } from "../../types/index.js"
import { z } from "zod"

export class Budget {
  private static _name_ = "budgets"

  static create(data: InputData) {
    return FirestoreDB.create<BudgetDoc>(Budget._name_, data)
  }

  static find(param: Partial<BudgetDoc> = {}) {
    return FirestoreDB.find<BudgetDoc>(Budget._name_, param)
  }

  static update(id: string, data: Pick<InputData, "name">) {
    return FirestoreDB.update<BudgetDoc>(Budget._name_, id, data)
  }

  static delete(id: string) {
    return FirestoreDB.delete(Budget._name_, id)
  }

  static clear() {
    return FirestoreDB.clear(Budget._name_)
  }

  static validate(data: InputData) {
    return safeParseReturn(Schema.safeParse(data))
  }
}

const Schema = z.object({ name: z.string().min(3), userId: z.string().min(3) })

type InputData = z.infer<typeof Schema>

type BudgetDoc = DocData & InputData
