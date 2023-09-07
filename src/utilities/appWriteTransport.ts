import Transport from "winston-transport"
import { Client, Databases, ID } from "node-appwrite"
import { config } from "../config/index.js"

const getDB = () => {
  const client = new Client()
    .setEndpoint(config.get("db_endpoint"))
    .setProject(config.get("db_project_id"))
    .setKey(config.get("db_project_key"))

  return { db: new Databases(client), dbId: config.get("db_id") }
}

export class AppWriteTransport extends Transport {
  constructor(opts?: any) {
    super(opts)
  }

  async log(info: any, callback: () => void) {
    const { db, dbId } = getDB()

    await db.createDocument(dbId, "64f9afccdbfb2a36946b", Date.now() + "", { info: JSON.stringify(info) })

    callback()

    setImmediate(() => {
      this.emit("logged", info)
    })
  }
}
