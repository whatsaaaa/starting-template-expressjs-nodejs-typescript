import {
  JsonController,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
} from "routing-controllers";
import { UserService } from "../services/UserService";

@JsonController("/users")
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  public getAll() {
    return this.userService.find();
  }

  @Get("/:id")
  public getOne(@Param("id") id: string) {
    return this.userService.findOne(id);
  }

  @Post()
  public post(@Body() user: any) {
    return "This action creates new user";
  }

  @Put("/:id")
  public put(@Param("id") id: string, @Body() user: any) {
    return "This action updates user #" + id;
  }

  @Delete("/:id")
  public delete(@Param("id") id: string) {
    return "This action deletes user #" + id;
  }
}
