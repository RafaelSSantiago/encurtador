import { User } from "../entities/User";

export interface UserRepositoryInterface {
  create(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
}
