import {
  JsonController,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
} from "routing-controllers";

@JsonController("/users")
export class UserController {
  @Get()
  public getAll() {
    return "This action returns all users.";
  }

  @Get("/:id")
  public getOne(@Param("id") id: number) {
    return "This action returns user #" + id;
  }

  @Post()
  public post(@Body() user: any) {
    return "This action creates new user";
  }

  @Put("/:id")
  public put(@Param("id") id: number, @Body() user: any) {
    return "This action updates user #" + id;
  }

  @Delete("/:id")
  public delete(@Param("id") id: number) {
    return "This action deletes user #" + id;
  }
}
