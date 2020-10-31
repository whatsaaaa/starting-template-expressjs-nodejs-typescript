import { join } from "path";

export function getEnv(key: string): string {
  if (typeof process.env[key] === "undefined") {
    throw new Error(`Environment variable ${key} is not defined.`);
  }

  return process.env[key] as string;
}

export function getPath(path: string): string {
  return process.env.NODE_ENV === "production"
    ? join(process.cwd(), path.replace("src/", "dist/").slice(0, -3) + ".js")
    : join(process.cwd(), path);
}

export function getPaths(paths: string[]): string[] {
  return paths.map((p) => getPath(p));
}

export function getEnvPaths(key: string): string[] {
  return getPaths(getEnvArray(key));
}

export function getEnvArray(key: string, delimiter: string = ","): string[] {
  return (process.env[key] && process.env[key].split(delimiter)) || [];
}
