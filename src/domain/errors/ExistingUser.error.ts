export class ExistingUser extends Error {
  constructor() {
    super("The received email is already in use");
    this.name = "ExistingUser";
  }
}
