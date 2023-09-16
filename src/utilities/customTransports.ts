import Transport from "winston-transport"
import fs from "fs"
import { getFirestore } from "firebase-admin/firestore"

// My transport for logging to my database provider
class Database extends Transport {
  constructor(opts?: any) {
    super({ ...opts })
  }

  async log(info: any, callback: () => void) {
    let { os, error, process, trace, ...rest } = info
    const colRef = getFirestore().collection("logs")

    const [, splat] = Object.getOwnPropertySymbols(rest)

    const dates = { timestamp: Date.now(), date: rest.date || new Date() }

    const er = { level: rest.level, message: rest.message, ...dates, ...rest[splat as any][0] }

    // console.log(er)

    try {
      await colRef.add(er)
    } catch (error: any) {
      await colRef.add({ message: "Could not write error", error: rest.message || "", ...dates })
      console.log("Could not write this error to db:")
    } finally {
      if (typeof callback === "function") callback()

      setImmediate(() => {
        this.emit("logged", info)
      })
    }
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
