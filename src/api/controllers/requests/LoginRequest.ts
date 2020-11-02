import { IsNotEmpty } from "class-validator";

export class LoginRequest {
  @IsNotEmpty()
  public username: string;

  @IsNotEmpty()
  public password: string;
}
