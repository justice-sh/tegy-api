import Transport from "winston-transport"
import { getDBClient } from "./db.js"
import fs from "fs"

// My transport for logging to my database provider
class Database extends Transport {
  constructor(opts?: any) {
    super(opts)
  }

  log(info: any, callback: () => void) {
    if (process.env.NODE_ENV === "production") {
      const { db, dbId } = getDBClient()

      db.createDocument(dbId, "log", Date.now() + "", { log: JSON.stringify(info) })
    }

    callback()

    setImmediate(() => {
      this.emit("logged", info)
    })
  }
}

// My transport for logging all levels excluding error
class File extends Transport {
  constructor(opts?: any) {
    super(opts)
  }

  log(info: any, callback: () => void) {
    const filename = "combined.log"
    // only exclude 'error' level
    if (info.level !== "error") {
      fs.appendFileSync(filename, JSON.stringify(info) + "\n")
    }

    callback()

    setImmediate(() => {
      this.emit("logged", info)
    })
  }
}

export const MyTransport = {
  Database,
  File,
}
