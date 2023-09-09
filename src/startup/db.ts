import { Budget } from "../models/budget.js"

export default async function () {
  await Budget.test()
}

// async function trycatch(fn: () => Promise<any>) {
//   try {
//     await fn()
//   } catch (error: any) {
//     if (error.response?.code !== 409) throw error
//   }
// }
