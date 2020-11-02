import { Service } from "typedi";
import { OrmRepository } from "typeorm-typedi-extensions";
import { v1 as uuid } from "uuid";
import jwt from "jsonwebtoken";

import { Logger, LoggerInterface } from "../../logger/Logger";
import { User } from "../models/User";
import { UserRepository } from "../repositories/UserRepository";
import { env } from "../../env";

@Service()
export class UserService {
  constructor(
    @OrmRepository() private userRepository: UserRepository,
    @Logger(__filename) private log: LoggerInterface
  ) {}

  public find(): Promise<User[]> {
    this.log.info("Find all users");
    return this.userRepository.find();
  }

  public findOne(id: string): Promise<User | undefined> {
    this.log.info("Find one user");
    return this.userRepository.findOne({ id });
  }

  public async create(user: User): Promise<User> {
    this.log.info("Create a new user => ", user.toString());
    user.id = uuid();
    const newUser = await this.userRepository.save(user);
    return newUser;
  }

  public update(id: string, user: User): Promise<User> {
    this.log.info("Update user");
    user.id = id;
    return this.userRepository.save(user);
  }

  public async delete(id: string): Promise<string> {
    this.log.info("Delete user");
    await this.userRepository.delete(id);
    return "success";
  }

  public async login(username: string, password: string): Promise<string> {
    const user = await this.validUser(username, password);
    if (!user) throw new Error("Invalid Credentials.");

    let token = jwt.sign(
      {
        username: (await user).username,
        email: (await user).email,
      },
      env.jwt.secret,
      {
        expiresIn: `${env.jwt.expiration}s`,
      }
    );

    return token;
  }

  private async validUser(username: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        username,
      },
    });

    if (!user) {
      return undefined;
    }

    if (await User.comparePassword(user, password)) {
      return user;
    }

    return undefined;
  }
}
