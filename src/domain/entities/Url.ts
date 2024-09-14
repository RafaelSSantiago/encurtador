export class Url {
  constructor(
    public id: number,
    public originalUrl: string,
    public shortenedUrl: string,
    public clicks: number,
    public userId?: number | null
  ) {}
}
