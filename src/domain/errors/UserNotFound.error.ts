export class UserNotFound extends Error {
  constructor(email: string) {
    super(`User not found: ${email}`);
    this.name = "UserNotFound";
  }
}
