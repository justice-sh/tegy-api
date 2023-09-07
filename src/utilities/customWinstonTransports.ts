import Transport from "winston-transport"
import { getDBClient } from "./db.js"
import fs from "fs"

// My transport for logging to my database provider
export class DBTransport extends Transport {
  constructor(opts?: any) {
    super(opts)
  }

  async log(info: any, callback: () => void) {
    const { db, dbId } = getDBClient()

    await db.createDocument(dbId, "log", Date.now() + "", { log: JSON.stringify(info) })

    callback()

    setImmediate(() => {
      this.emit("logged", info)
    })
  }
}

// My transport for logging for all levels excluding error
export class FileTransport extends Transport {
  constructor(opts?: any) {
    super(opts)
  }

  log(info: any, callback: () => void) {
    // only exclude 'error' level
    if (info.level !== "error") {
      fs.writeFileSync("combined.log", JSON.stringify(info))
    }

    callback()

    setImmediate(() => {
      this.emit("logged", info)
    })
  }
}
