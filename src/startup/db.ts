import { cert, initializeApp } from "firebase-admin/app"
import { config } from "../config/index.js"
import { Budget } from "../models/budget.js"
import { User } from "../models/user.js"
import firebase from "firebase-admin"

export default async function () {
  const serviceAccount = JSON.parse(config.get("service_account"))

  initializeApp({
    credential: cert(serviceAccount),
  })

  firebase.firestore().settings({ ignoreUndefinedProperties: true })

  await Promise.all([User.test(), Budget.test()])
}
