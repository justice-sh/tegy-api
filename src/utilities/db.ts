import { Client, Databases } from "node-appwrite"
import { initializeApp, cert } from "firebase-admin/app"
import { getFirestore, Timestamp, FieldValue, Filter } from "firebase-admin/firestore"
import { config } from "../config/index.js"

export const getDBClient = () => {
  const client = new Client()
    .setEndpoint(config.get("db_endpoint"))
    .setProject(config.get("db_project_id"))
    .setKey(config.get("db_project_key"))

  return { db: new Databases(client), dbId: config.get<string>("db_id"), name: config.get<string>("db_name") }
}

export const getFirestoreDB = () => {
  const serviceAccount = JSON.parse(config.get("g_service_account"))

  initializeApp({
    credential: cert(serviceAccount),
  })

  return getFirestore()
}
