import { Body, JsonController, Post } from "routing-controllers";

import { UserService } from "../services/UserService";
import { LoginRequest } from "./requests/LoginRequest";

@JsonController("/auth")
export class AuthController {
  constructor(private userService: UserService) {}

  @Post()
  public auth(@Body() body: LoginRequest) {
    return this.userService.login(body.username, body.password);
  }
}
