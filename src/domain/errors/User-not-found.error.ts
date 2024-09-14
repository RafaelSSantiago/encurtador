export class UserNotFound extends Error {
  constructor(userId: number) {
    super(`User not found: ${userId}`);
    this.name = "UserNotFound";
  }
}
