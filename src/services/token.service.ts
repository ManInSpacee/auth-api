import { config } from "../config";
import jwt from "jsonwebtoken";

export class TokenService {
  generateTokens(userId: string, email: string) {
    const accessToken = jwt.sign({ userId, email }, config.jwtAccessSecret, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign({ userId, email }, config.jwtRefreshSecret, {
      expiresIn: "7d",
    });
    return { accessToken, refreshToken };
  }
}
