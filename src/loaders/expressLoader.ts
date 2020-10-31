import { Application } from "express";
import { createExpressServer } from "routing-controllers";

import { env } from "../env";

export const expressLoader = async () => {
  const expressApp: Application = createExpressServer({
    cors: env.app.express.useCors,
    classTransformer: env.app.express.useClassTransform,
    routePrefix: env.app.routePrefix,
    controllers: env.app.paths.controllers,
  });

  if (!env.isTest) {
    expressApp.listen(env.app.port);
  }
};
