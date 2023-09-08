import { Client, Databases } from "node-appwrite"
import { config } from "../config/index.js"

export const getDBClient = () => {
  const client = new Client()
    .setEndpoint(config.get("db_endpoint"))
    .setProject(config.get("db_project_id"))
    .setKey(config.get("db_project_key"))

  return { handle: new Databases(client), id: config.get<string>("db_id"), name: config.get<string>("db_name") }
}
