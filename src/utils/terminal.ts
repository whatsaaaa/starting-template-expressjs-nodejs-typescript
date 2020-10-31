import { env } from "../env";
import { Logger } from "./logger";

export function terminal(log: Logger): void {
  const route = () => `${env.app.schema}://${env.app.host}:${env.app.port}`;
  log.info(``);
  log.info(`Hello 👋, your app is ready on ${route()}${env.app.routePrefix}`);
  log.info(`To shut it down, press <CTRL> + C at any time.`);
  log.info(``);
  log.info(`------------------------------------------------------------`);
  log.info(`Environment    : ${env.node}`);
  log.info(`Version        : ${env.app.version}`);
  log.info(``);
  log.info(`API            : ${route()}${env.app.routePrefix}`);
  log.info(`------------------------------------------------------------`);
  log.info(``);
}
