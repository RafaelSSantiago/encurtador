export interface UserDTO {
  id: number;
  email: string;
  iat: number;
  exp: number;
}

export interface DeleteUrlDTO {
  url: string;
  user: UserDTO;
}
