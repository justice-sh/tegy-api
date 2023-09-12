import { config } from "../config/index.js"

export default async function () {
  if (!config.get("jwt_private_key")) {
    throw Error("FATAL ERROR: jwtPrivateKey is not defined.")
  }
}
