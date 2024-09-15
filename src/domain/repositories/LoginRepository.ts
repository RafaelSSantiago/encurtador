import { User } from "../entities/User";

export interface LoginRepository {
  login(data: Partial<User>): Promise<any>;
}
