import {
  JsonController,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  OnUndefined,
  Authorized,
} from "routing-controllers";

import { UserService } from "../services/UserService";
import { User } from "../models/User";
import { BaseUser } from "./requests/BaseUser";
import { CreateUser } from "./requests/CreateUser";
import { UserNotFoundError } from "../exceptions/UserNotFoundError";

@Authorized()
@JsonController("/users")
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  public getAll() {
    return this.userService.find();
  }

  @Get("/:id")
  @OnUndefined(UserNotFoundError)
  public getOne(@Param("id") id: string) {
    return this.userService.findOne(id);
  }

  @Post()
  public create(@Body() body: CreateUser): Promise<User> {
    const user = new User();
    user.email = body.email;
    user.firstName = body.firstName;
    user.lastName = body.lastName;
    user.password = body.password;
    user.username = body.username;

    return this.userService.create(user);
  }

  @Put("/:id")
  public update(
    @Param("id") id: string,
    @Body() body: BaseUser
  ): Promise<User> {
    const user = new User();
    user.email = body.email;
    user.firstName = body.firstName;
    user.lastName = body.lastName;
    user.username = body.username;

    return this.userService.update(id, user);
  }

  @Delete("/:id")
  public delete(@Param("id") id: string): Promise<string> {
    return this.userService.delete(id);
  }
}
