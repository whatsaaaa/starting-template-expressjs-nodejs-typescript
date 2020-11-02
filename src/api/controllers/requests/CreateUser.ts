import { IsNotEmpty } from "class-validator";
import { BaseUser } from "./BaseUser";

export class CreateUser extends BaseUser {
  @IsNotEmpty()
  public password: string;
}
