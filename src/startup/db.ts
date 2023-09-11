import { cert, initializeApp } from "firebase-admin/app"
import { config } from "../config/index.js"
import { Budget } from "../models/budget.js"
import { User } from "../models/user.js"

export default async function () {
  const serviceAccount = JSON.parse(config.get("service_account"))

  initializeApp({
    credential: cert(serviceAccount),
  })

  await Promise.all([User.test(), Budget.test()])
}
