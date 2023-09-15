import { IncomingMessage, Server, ServerResponse } from "http"

export * from "./tegy.js"

export type AppServer = Server<typeof IncomingMessage, typeof ServerResponse>
