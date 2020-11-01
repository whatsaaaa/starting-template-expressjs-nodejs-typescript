import "reflect-metadata";

import { terminal } from "./utils/terminal";
import { Logger } from "./utils/logger";
import { expressBuilder } from "./builders/expressBuilder";
import { winstonBuilder } from "./builders/winstonBuilder";
import { typediBuilder } from "./builders/typediBuilder";
/**
 * EXPRESSJS NODEJS TYPESCRIPT Template
 * ----------------------------------------------
 */
const log = new Logger(__filename);

winstonBuilder();
typediBuilder();

expressBuilder()
  .then(() => {
    terminal(log);
  })
  .catch((error) => log.error("Application crashed: " + error));
