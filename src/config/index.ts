import development from "./env/development.js"
import production from "./env/production.js"
import test from "./env/test.js"
import custom from "./env/custom-environment-variables.js"

class Config {
  private static instance: Config | undefined

  private constructor() {}

  public static getInstance() {
    if (!Config.instance) Config.instance = new Config()
    return Config.instance
  }

  public get(key: Key) {
    const env = process.env.NODE_ENV as CONFIG_NODE_ENV

    let value = this.getValue(key, env)

    if (!value) value = process.env[this.getValue(key, "custom")]

    return value
  }

  private getValue(key: Key, env: CONFIG_NODE_ENV) {
    let value = Envs[env] as any

    const stringedKey = key as string
    stringedKey.split(".").forEach((k) => {
      value = value[k]
    })

    return value
  }
}

const Envs = {
  development,
  production,
  test,
  custom,
}

type CONFIG_NODE_ENV = keyof typeof Envs

type Key = keyof typeof development | keyof typeof production | keyof typeof test | keyof typeof custom

export const config = Config.getInstance()
