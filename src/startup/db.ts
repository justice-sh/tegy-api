import { cert, initializeApp } from "firebase-admin/app"
import { config } from "../config/index.js"
import { Budget } from "../models/budget.js"

export default async function () {
  const serviceAccount = JSON.parse(config.get("g_service_account"))

  initializeApp({
    credential: cert(serviceAccount),
  })

  await Budget.test()
}

// async function trycatch(fn: () => Promise<any>) {
//   try {
//     await fn()
//   } catch (error: any) {
//     if (error.response?.code !== 409) throw error
//   }
// }
