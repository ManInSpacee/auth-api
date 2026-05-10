import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { JwtUser } from "../types/jwt.types";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.accessToken;
    const payload = jwt.verify(token, config.jwtAccessSecret);
    req.user = payload as JwtUser;
    next();
  } catch {
    return res.status(401).json({ error: "Unauthorized" });
  }
};
