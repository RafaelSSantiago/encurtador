export interface UserDTO {
  id: string;
  email: string;
  iat: number;
  exp: number;
}

export interface DeleteUrlDTO {
  url: string;
  user: UserDTO;
}
