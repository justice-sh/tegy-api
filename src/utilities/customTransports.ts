import Transport from "winston-transport"
import fs from "fs"
import { getFirestore } from "firebase-admin/firestore"

// My transport for logging to my database provider
class Database extends Transport {
  constructor(opts?: any) {
    super({ ...opts, handleExceptions: true })
  }

  log(info: any, callback: () => void) {
    const { os, error, process, trace, ...rest } = info
    getFirestore()
      .collection("logs")
      .add({
        ...rest,
        timestamp: Date.now(),
        date: rest.date || new Date(),
      })
      .then((v) => {
        callback()

        setImmediate(() => {
          this.emit("logged", info)
        })
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
