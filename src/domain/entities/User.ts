export class User {
  constructor(
    public id: number | string,
    public email: string,
    public password?: string
  ) {}
}
