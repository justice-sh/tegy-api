import { Client, Databases } from "node-appwrite"
import { config } from "../config/index.js"

class DBClient {
  private static instance: DBClient | undefined
  private client: Client
  db: Databases
  id: string

  private constructor() {
    this.client = new Client()
      .setEndpoint(config.get("db_endpoint"))
      .setProject(config.get("db_project_id"))
      .setKey(config.get("db_project_key"))

    this.db = new Databases(this.client)
    this.id = config.get("db_id")
  }

  public static getInstance() {
    if (!DBClient.instance) DBClient.instance = new DBClient()

    return DBClient.instance
  }
}

export default function () {
  const client = DBClient.getInstance()
  return client
}
