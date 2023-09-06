import development from "./development.js";
import production from "./production.js";
import test from "./test.js";

class Config {
  get(key: string) {
    const env = process.env.NODE_ENV as CONFIG_NODE_ENV;
    let value = ConfigEnvVars[env] as any;

    key.split(".").forEach((k) => {
      value = value[k];
    });

    return value;
  }
}

const ConfigEnvVars = {
  development,
  production,
  test,
};

type CONFIG_NODE_ENV = keyof typeof ConfigEnvVars;

type Key =
  | keyof typeof development
  | keyof typeof production
  | keyof typeof test;

const nothing = (key: Key) => {
  // This function ensures I have exactly the same vars in each config/{NODE_ENV}.ts file
  const env = process.env.NODE_ENV as CONFIG_NODE_ENV;
  ConfigEnvVars[env][key];
};

export const config = new Config();
