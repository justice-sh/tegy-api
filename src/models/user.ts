import { getFirestore } from "firebase-admin/firestore"
import { z } from "zod"
import bcrypt from "bcrypt"

const Schema = z.object({ name: z.string().min(3), email: z.string().email(), password: z.string().min(5) })

type InputData = z.infer<typeof Schema>

type UserData = {
  id: string
  name: string
  email: string
  createdAt: number
  updatedAt: number
}

type DocSnapshot = FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>
type UserDoc = UserData & InputData

export class User {
  private static id = "users"

  private constructor() {}

  static async test() {
    // await User.create({ email: "sherllyj191@gmail.com", name: "Justice", password: "1234" })
    // await User.clear()
    // console.log("Done")
  }

  static async create(data: InputData): Promise<UserData> {
    const docRef = getFirestore().collection(User.id).doc()

    const user: UserDoc = {
      ...data,
      id: docRef.id,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(data.password, salt)

    await docRef.set(user)

    const doc = await docRef.get()
    return User.getData(doc)
  }

  static async find(param: Partial<UserDoc> = {}): Promise<UserData[]> {
    const paramKeys = Object.keys(param) as (keyof UserDoc)[]

    let colRef = getFirestore().collection(User.id)

    if (paramKeys.length) {
      paramKeys.forEach((key) => {
        colRef = colRef.where(key, "==", param[key]) as any
      })
    }

    const list = await colRef.get()

    return list.docs.map(User.getData) as UserData[]
  }

  static async update(id: string, data: Pick<InputData, "name">): Promise<UserData> {
    const docRef = getFirestore().collection(User.id).doc(id)
    await docRef.update({ ...data, updatedAt: Date.now() })
    const doc = await docRef.get()
    return User.getData(doc)
  }

  static async delete(id: string) {
    await getFirestore().collection(User.id).doc(id).delete()
  }

  static async createMany(data: InputData[]): Promise<UserData[]> {
    return Promise.all(data.map(User.create))
  }

  private static getData(doc: DocSnapshot): UserData {
    const data = doc.data() as Partial<UserDoc>
    delete data.password
    return data as UserDoc
  }

  static async clear() {
    const docs = await getFirestore().collection(User.id).listDocuments()
    await Promise.all(docs.map((d) => d.delete()))
  }

  static validate(data: InputData) {
    const result = Schema.safeParse(data)

    return { data: result.success ? result.data : null, error: !result.success ? result.error : null }
  }
}
