import { getFirestore } from "firebase-admin/firestore"
import { DocData } from "../../types/index.js"

export class FirestoreDB {
  static async create<T>(collection: string, data: any) {
    const docRef = getFirestore().collection(collection).doc()

    const docData: DocData = {
      ...data,
      id: docRef.id,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }

    await docRef.set(docData)

    return docData as T
  }

  static async delete<T>(collection: string, id: string) {
    return getFirestore().collection(collection).doc(id).delete()
  }

  static async update<T>(collection: string, id: string, data: any) {
    const docRef = getFirestore().collection(collection).doc(id)
    await docRef.update({ ...data, updatedAt: Date.now() })
    const doc = await docRef.get()
    return doc.data() as T
  }

  static async find<T>(collection: string, param: Partial<any> = {}) {
    const paramKeys = Object.keys(param)

    let colRef = getFirestore().collection(collection)

    if (paramKeys.length) {
      paramKeys.forEach((key) => {
        colRef = colRef.where(key, "==", param[key] ?? "") as any
      })
    }

    const list = await colRef.get()

    return list.docs.map((doc) => doc.data()).filter((doc) => doc) as T[]
  }

  static async clear(collection: string) {
    const docs = await getFirestore().collection(collection).listDocuments()
    return Promise.all(docs.map((d) => d.delete()))
  }
}
