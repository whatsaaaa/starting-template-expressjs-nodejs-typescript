import * as dotenv from "dotenv";
import * as path from "path";

import * as pkgjson from "../package.json";
import { getEnv, getEnvPaths, toBool } from "./utils/env";

/**
 * Load .env file
 */
dotenv.config({ path: path.join(process.cwd(), ".env") });

/**
 * Environment variables
 */
export const env = {
  node: process.env.NODE_ENV || "development",
  isProduction: process.env.NODE_ENV === "production",
  isTest: process.env.NODE_ENV === "test",
  isDevelopment: process.env.NODE_ENV === "development",
  app: {
    name: getEnv("APPLICATION_NAME"),
    version: (pkgjson as any).version,
    description: (pkgjson as any).description,
    host: getEnv("APPLICATION_HOST"),
    schema: getEnv("APPLICATION_SCHEMA"),
    routePrefix: getEnv("APPLICATION_ROUTE_PREFIX"),
    port: getEnv("APPLICATION_PORT"),
    express: {
      useCors: toBool(getEnv("EXPRESS_CORS")),
      useClassTransform: toBool(getEnv("EXPRESS_CLASS_TRANSFORM")),
    },
    paths: {
      controllers: getEnvPaths("APPLICATION_CONTROLLERS"),
      migrations: getEnvPaths("APPLICATION_MIGRATIONS"),
      entities: getEnvPaths("APPLICATION_ENTITIES"),
    },
  },
  db: {
    type: getEnv("DB_CONNECTION"),
    host: getEnv("DB_HOST"),
    port: getEnv("DB_PORT"),
    username: getEnv("DB_USERNAME"),
    password: getEnv("DB_PASSWORD"),
    database: getEnv("DB_DATABASE"),
    synchronize: toBool(getEnv("DB_SYNCHRONIZE")),
    logging: getEnv("DB_LOGGING"),
  },
  log: {
    level: getEnv("LOG_LEVEL"),
    output: getEnv("LOG_OUTPUT"),
  },
};
