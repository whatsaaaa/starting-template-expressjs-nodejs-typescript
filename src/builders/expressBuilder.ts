import { Application } from "express";
import { createExpressServer } from "routing-controllers";

import { authorizationChecker } from "../api/auth/authorizationChecker";
import { env } from "../env";

export const expressBuilder = async () => {
  const expressApp: Application = createExpressServer({
    cors: env.app.express.useCors,
    classTransformer: env.app.express.useClassTransform,
    routePrefix: env.app.routePrefix,
    defaultErrorHandler: false,
    controllers: env.app.paths.controllers,
    middlewares: env.app.paths.middlewares,

    authorizationChecker: authorizationChecker(),
  });

  if (!env.isTest) {
    expressApp.listen(env.app.port);
  }
};
