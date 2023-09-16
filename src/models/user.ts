import { safeParseReturn } from "../utilities/zod.js"
import { config } from "../config/index.js"
import { FirestoreDB } from "../utilities/firestore.js"
import { DocData } from "../../types/index.js"
import jwt from "jsonwebtoken"
import { z } from "zod"

export class User {
  private static colId = "users"

  static create(data: InputData) {
    return FirestoreDB.create<UserDoc>(User.colId, data)
  }

  static find(param: Partial<UserDoc> = {}) {
    return FirestoreDB.find<UserDoc>(User.colId, param)
  }

  static clear() {
    return FirestoreDB.clear(User.colId)
  }

  static getData(data: UserDoc): UserData {
    delete (data as Partial<UserDoc>).password
    return data as UserData
  }

  static validate(data: InputData) {
    const result = Schema.safeParse(data)
    return safeParseReturn(result)
  }

  static generateAuthToken({ id, isAdmin }: UserDoc) {
    const token = jwt.sign({ id, isAdmin }, config.get("jwt_private_key"))
    return token
  }
}

const Schema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(5),
  isAdmin: z.boolean().optional(),
})

type InputData = z.infer<typeof Schema>

type UserData = Pick<InputData, "name" | "email"> & DocData

type UserDoc = DocData & InputData
