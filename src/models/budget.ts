import { getFirestore } from "firebase-admin/firestore"

type InputData = { name: string; userId: string }

type BudgetData = {
  id: string
  name: string
  createdAt: number
  updatedAt: number
}

type DocSnapshot = FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>
type BudgetDoc = BudgetData & InputData

export class Budget {
  private static id = "budgets"

  private constructor() {}

  static async test() {}

  static async create(data: InputData): Promise<BudgetData> {
    const docRef = getFirestore().collection(Budget.id).doc()

    const createdAt = Date.now()
    const budget: BudgetData = {
      ...data,
      id: docRef.id,
      createdAt,
      updatedAt: createdAt,
    }

    await docRef.set(budget)
    const doc = await docRef.get()
    return Budget.getData(doc)
  }

  static async find(param: Partial<BudgetDoc> = {}): Promise<BudgetData[]> {
    const paramKeys = Object.keys(param) as (keyof BudgetDoc)[]

    let colRef = getFirestore().collection(Budget.id)

    if (paramKeys.length) {
      paramKeys.forEach((key) => {
        colRef = colRef.where(key, "==", param[key]) as any
      })
    }

    const list = await colRef.get()

    return list.docs.map(Budget.getData) as BudgetData[]
  }

  static async update(id: string, data: Pick<InputData, "name">): Promise<BudgetData> {
    const docRef = getFirestore().collection(Budget.id).doc(id)
    await docRef.update({ ...data, updatedAt: Date.now() })
    const doc = await docRef.get()
    return Budget.getData(doc)
  }

  static async delete(id: string) {
    await getFirestore().collection(Budget.id).doc(id).delete()
  }

  static async createMany(data: InputData[]): Promise<BudgetData[]> {
    return Promise.all(data.map(Budget.create))
  }

  private static getData(doc: DocSnapshot): BudgetData {
    const data = doc.data() as BudgetDoc
    delete (data as any).userId
    return data
  }

  static async clear() {
    const docs = await getFirestore().collection(Budget.id).listDocuments()
    await Promise.all(docs.map((d) => d.delete()))
  }
}

/***
 * import { ID, Models, Query } from "node-appwrite"
import { getDBClient, getFirestoreDB } from "../utilities/db.js"

type InputData = { name: string; userId: string }

type BudgetData = {
  id: string
  name: string
  createdAt: string
  updatedAt: string
}

type BudgetDoc = Models.Document & InputData

type BudgetDocs = Models.DocumentList<BudgetDoc>

export class Budget {
  private static id = "16942551718493a75fa55"
  private static modelName = "Budget"

  private constructor() {}

  static async test() {
    const d = await Budget.create2({ name: "Budget1", userId: "user1" })
    console.log(d)
  }

  static async create(data: InputData): Promise<BudgetData> {
    const { db, dbId } = getDBClient()
    const doc = await db.createDocument<BudgetDoc>(dbId, Budget.id, ID.unique(), data)
    return Budget.getProps(doc)
  }

  static async find(param: Partial<BudgetDoc> = {}): Promise<BudgetData[]> {
    const { db, dbId } = getDBClient()

    const paramKeys = Object.keys(param) as (keyof BudgetDoc)[]
    const queries = paramKeys.map((key) => Query.equal(key, param[key] as string))

    const res: BudgetDocs = await db.listDocuments(dbId, Budget.id, queries)
    return res.documents.map(Budget.getProps)
  }

  static async update(id: string, data: Pick<InputData, "name">): Promise<BudgetData> {
    const { db, dbId } = getDBClient()
    const doc = await db.updateDocument<BudgetDoc>(dbId, Budget.id, id, data)
    return Budget.getProps(doc)
  }

  static async delete(id: string) {
    const { db, dbId } = getDBClient()
    return await db.deleteDocument(dbId, Budget.id, id)
  }

  static async clear() {
    const { db, dbId } = getDBClient()
    const budgets = await Budget.find()
    return Promise.all(budgets.map((b) => db.deleteDocument(dbId, Budget.id, b.id)))
  }

  static async insertMany(data: InputData[]): Promise<BudgetData[]> {
    return Promise.all(data.map(Budget.create))
  }

  private static getProps(doc: BudgetDoc): BudgetData {
    return {
      id: doc.$id,
      name: doc.name,
      createdAt: doc.$createdAt,
      updatedAt: doc.$updatedAt,
    }
  }

  // this method is never meant to be called outside of this class.
  private static async createCollection() {
    const { db, dbId } = getDBClient()
    const [name, userId] = ["name", "userId"] // attributes.

    await db.createCollection(dbId, Budget.id, Budget.modelName)

    await Promise.all([
      db.createStringAttribute(dbId, Budget.id, name, 50, true),
      db.createStringAttribute(dbId, Budget.id, userId, 256, true),
    ])

    await Promise.all([
      db.createIndex(dbId, Budget.id, name, "Key", [name], ["ASC"]),
      db.createIndex(dbId, Budget.id, userId, "Key", [userId], ["ASC"]),
      db.createIndex(dbId, Budget.id, "combined", "Key", [name, userId], ["ASC", "ASC"]),
    ])

    console.log("Collection created!")
  }

  private static async deleteCollection(id?: string) {
    const { db, dbId } = getDBClient()

    await db.deleteCollection(dbId, id || Budget.id)
    console.log("Collection deleted!")
  }
}

 */
