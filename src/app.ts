import "reflect-metadata";

import { terminal } from "./utils/terminal";
import { Logger } from "./utils/logger";
import { expressLoader } from "./loaders/expressLoader";
import { winstonLoader } from "./loaders/winstonLoader";
/**
 * EXPRESSJS NODEJS TYPESCRIPT Template
 * ----------------------------------------------
 */
const log = new Logger(__filename);

expressLoader()
  .then(() => {
    winstonLoader();
    terminal(log);
  })
  .catch((error) => log.error("Application crashed: " + error));
