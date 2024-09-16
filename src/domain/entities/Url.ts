export class Url {
  constructor(
    public id: string,
    public originalUrl: string,
    public shortenedUrl?: string,
    public clicks?: number,
    public userId?: number | null,
    public jwtUser?: any
  ) {}
}
