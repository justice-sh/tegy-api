import { z } from "zod"
import { getFirestore } from "firebase-admin/firestore"
import { safeParseReturn } from "../utilities/zod.js"

export class User {
  private static id = "users"

  private constructor() {}

  static async test() {}

  static async create(data: InputData): Promise<UserDoc> {
    const docRef = getFirestore().collection(User.id).doc()

    const user: UserDoc = {
      ...data,
      id: docRef.id,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }

    await docRef.set(user)

    return user
  }

  static async find(param: Partial<UserDoc> = {}) {
    const paramKeys = Object.keys(param) as (keyof UserDoc)[]

    let colRef = getFirestore().collection(User.id)

    if (paramKeys.length) {
      paramKeys.forEach((key) => {
        colRef = colRef.where(key, "==", param[key]) as any
      })
    }

    const list = await colRef.get()

    return list.docs.map((doc) => doc.data()) as UserDoc[]
  }

  static async update(id: string, data: Pick<InputData, "name">): Promise<UserDoc> {
    const docRef = getFirestore().collection(User.id).doc(id)
    await docRef.update({ ...data, updatedAt: Date.now() })
    const doc = await docRef.get()
    return doc.data() as UserDoc
  }

  static async delete(id: string) {
    await getFirestore().collection(User.id).doc(id).delete()
  }

  static async createMany(data: InputData[]) {
    return Promise.all(data.map(User.create))
  }

  static getData(data: UserDoc): UserData {
    delete (data as Partial<UserDoc>).password
    return data as UserData
  }

  static async clear() {
    const docs = await getFirestore().collection(User.id).listDocuments()
    await Promise.all(docs.map((d) => d.delete()))
  }

  static validate(data: InputData) {
    const result = Schema.safeParse(data)
    return safeParseReturn(result)
  }
}

const Schema = z.object({ name: z.string().min(3), email: z.string().email(), password: z.string().min(5) })

type InputData = z.infer<typeof Schema>

type UserData = {
  id: string
  name: string
  email: string
  createdAt: number
  updatedAt: number
}

type UserDoc = UserData & InputData
