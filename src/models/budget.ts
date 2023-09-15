import { getFirestore } from "firebase-admin/firestore"
import { z } from "zod"
import { safeParseReturn } from "../utilities/zod.js"

export class Budget {
  private static name_ = "budgets"

  private constructor() {}

  static async test() {}

  static async create(data: InputData): Promise<BudgetDoc> {
    const docRef = getFirestore().collection(Budget.name_).doc()

    const budget: BudgetDoc = {
      ...data,
      id: docRef.id,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }

    await docRef.set(budget)
    return budget
  }

  static async find(param: Partial<BudgetDoc> = {}) {
    const paramKeys = Object.keys(param) as (keyof BudgetDoc)[]

    let colRef = getFirestore().collection(Budget.name_)

    if (paramKeys.length) {
      paramKeys.forEach((key) => {
        colRef = colRef.where(key, "==", param[key] ?? "") as any
      })
    }

    const list = await colRef.get()

    return list.docs.map((doc) => doc.data()).filter((doc) => doc) as BudgetDoc[]
  }

  static async update(id: string, data: Pick<InputData, "name">) {
    const docRef = getFirestore().collection(Budget.name_).doc(id)
    await docRef.update({ ...data, updatedAt: Date.now() })
    const doc = await docRef.get()
    return doc.data() as BudgetDoc
  }

  static async delete(id: string) {
    await getFirestore().collection(Budget.name_).doc(id).delete()
  }

  static async clear() {
    const docs = await getFirestore().collection(Budget.name_).listDocuments()
    await Promise.all(docs.map((d) => d.delete()))
  }

  static validate(data: InputData) {
    return safeParseReturn(Schema.safeParse(data))
  }
}

const Schema = z.object({ name: z.string().min(3), userId: z.string().min(3) })

type InputData = z.infer<typeof Schema>

type BudgetData = {
  id: string
  name: string
  createdAt: number
  updatedAt: number
}

// type DocSnapshot = FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>
type BudgetDoc = BudgetData & InputData
