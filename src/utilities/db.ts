import { initializeApp, cert } from "firebase-admin/app"
import { getFirestore, Timestamp, FieldValue, Filter } from "firebase-admin/firestore"
import { config } from "../config/index.js"

export const getFirestoreDB = () => {
  const serviceAccount = JSON.parse(config.get("g_service_account"))

  initializeApp({
    credential: cert(serviceAccount),
  })

  return getFirestore()
}
