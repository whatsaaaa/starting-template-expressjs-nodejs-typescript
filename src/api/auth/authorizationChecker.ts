import { Action } from "routing-controllers";
import { Container } from "typedi";

import { Logger } from "../../utils/logger";
import { AuthService } from "../services/AuthService";

export function authorizationChecker(): (
  action: Action,
  roles: any[]
) => Promise<boolean> | boolean {
  const log = new Logger(__filename);
  const authService = Container.get<AuthService>(AuthService);

  return async function checker(
    action: Action,
    roles: string[]
  ): Promise<boolean> {
    const jwt = authService.parseBearerTokenAuthFromRequest(action.request);

    if (jwt === undefined) {
      log.warn("No credentials found.");
      return false;
    }

    action.request.user = await authService.validateJwtToken(jwt.token);

    if (action.request.user === undefined) {
      log.warn("Invalid credentials.");
      return false;
    }

    log.info("Successfully checked credentials");
    return true;
  };
}
