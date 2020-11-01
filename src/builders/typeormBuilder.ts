import { createConnection, getConnectionOptions } from "typeorm";

import { env } from "../env";

export const typeormBuilder = async () => {
  const loadedConnectionOptions = await getConnectionOptions();
  const connectionOptions = Object.assign(loadedConnectionOptions, {
    type: env.db.type as any,
    host: env.db.host,
    port: env.db.port,
    username: env.db.username,
    password: env.db.password,
    database: env.db.database,
    synchronize: env.db.synchronize,
    logging: env.db.logging,
    entities: env.app.paths.entities,
    migrations: env.app.paths.migrations,
  });

  await createConnection(connectionOptions);
};
