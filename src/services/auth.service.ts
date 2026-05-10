import jwt from "jsonwebtoken";
import bycrypt from "bcrypt";
import { AppError } from "../errors/AppError";
import { UserRepository } from "../repositories/user.repository";
import { TokenService } from "./token.service";
import { config } from "../config";
import { JwtUser } from "../types/jwt.types";

export class AuthService {
  repository = new UserRepository();
  tokenService = new TokenService();

  async register(name: string, email: string, password: string) {
    if (!name || !email || !password)
      throw AppError.badRequest("All fields are required");

    const existingUser = await this.repository.findByEmail(email);
    if (existingUser) throw AppError.conflict("Email already in use");

    const saltRounds = 12;
    const hashedPassword = await bycrypt.hash(password, saltRounds);

    const newUser = await this.repository.create(email, name, hashedPassword);
    const { accessToken, refreshToken } = this.tokenService.generateTokens(
      newUser.id,
      newUser.email,
    );
    return {
      user: { id: newUser.id, email: newUser.email },
      accessToken,
      refreshToken,
    };
  }

  async login(email: string, password: string) {
    const existingUser = await this.repository.findByEmail(email);
    if (!existingUser) throw AppError.notFound("User not found");
    const isPasswordCorrect = await bycrypt.compare(
      password,
      existingUser.hashPassword,
    );
    if (!isPasswordCorrect) throw AppError.unauthorized("Wrong password");
    const { accessToken, refreshToken } = this.tokenService.generateTokens(
      existingUser.id,
      existingUser.email,
    );
    return {
      user: { id: existingUser.id, email: existingUser.email },
      accessToken,
      refreshToken,
    };
  }

  refresh(token: string) {
    const userToken = jwt.verify(token, config.jwtRefreshSecret) as JwtUser;
    const newTokens = this.tokenService.generateTokens(
      userToken.userId,
      userToken.email,
    );
    return newTokens;
  }
}
