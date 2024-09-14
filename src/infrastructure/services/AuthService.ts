import jwt from "jsonwebtoken";

export class AuthService {
  generateToken(userId: number) {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET!, {
      expiresIn: "3h",
    });
  }

  verifyToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET!);
  }
}
