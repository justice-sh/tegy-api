import firebase from "firebase-admin"
import { cert, initializeApp } from "firebase-admin/app"
import { config } from "../config/index.js"

export default async function () {
  const serviceAccount = JSON.parse(config.get("service_account"))

  initializeApp({
    credential: cert(serviceAccount),
  })

  firebase.firestore().settings({ ignoreUndefinedProperties: true })
}
