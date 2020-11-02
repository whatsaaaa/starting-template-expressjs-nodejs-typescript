import * as express from "express";
import { Service } from "typedi";
import jwt from "jsonwebtoken";

import { Logger, LoggerInterface } from "../../logger/Logger";
import { env } from "../../env";

@Service()
export class AuthService {
  constructor(@Logger(__filename) private log: LoggerInterface) {}

  public parseBearerTokenAuthFromRequest(
    req: express.Request
  ): { token: string } {
    const authorization = req.header("authorization");
    if (authorization && authorization.split(" ")[0] === "Bearer") {
      this.log.info("JWT token provided by the client");
      const token = authorization.split(" ")[1];

      if (token == null) {
        this.log.info("JWT token is empty");
        return undefined;
      }

      return { token };
    }

    this.log.info("No JWT token provided by the client.");
    return undefined;
  }

  public validateJwtToken(token: string): Promise<any> {
    return jwt.verify(token, env.jwt.secret, (err, data) => {
      if (err) return undefined;
      return data;
    });
  }
}
