import { Service } from "typedi";
import { OrmRepository } from "typeorm-typedi-extensions";
import uuid from "uuid";

import { Logger, LoggerInterface } from "../../logger/Logger";
import { User } from "../models/User";
import { UserRepository } from "../repositories/UserRepository";

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
    this.log.info("Create new user => ", user.toString());
    user.id = uuid.v1();
    const newUser = await this.userRepository.save(user);
    return newUser;
  }

  public update(id: string, user: User): Promise<User> {
    this.log.info("Update user");
    user.id = id;
    return this.userRepository.save(user);
  }

  public async delete(id: string): Promise<void> {
    this.log.info("Delete user");
    await this.userRepository.delete(id);
    return;
  }
}
