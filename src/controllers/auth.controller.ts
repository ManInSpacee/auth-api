import { AppError } from "../errors/AppError";
import { AuthService } from "../services/auth.service";
import { Request, Response } from "express";

export class AuthController {
  service = new AuthService();

  register = async (
    req: Request<
      {},
      {},
      {
        name: string;
        email: string;
        password: string;
      }
    >,
    res: Response,
  ): Promise<void> => {
    try {
      const { user, accessToken, refreshToken } = await this.service.register(
        req.body.name,
        req.body.email,
        req.body.password,
      );
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
      });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.json(user);
    } catch (err) {
      const status = err instanceof AppError ? err.status : 500;
      const message = err instanceof Error ? err.message : "UnknownError";
      res.status(status).json({ error: message });
    }
  };

  login = async (
    req: Request<
      {},
      {},
      {
        email: string;
        password: string;
      }
    >,
    res: Response,
  ): Promise<void> => {
    try {
      const { user, accessToken, refreshToken } = await this.service.login(
        req.body.email,
        req.body.password,
      );
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
      });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.json(user);
    } catch (err) {
      const status = err instanceof AppError ? err.status : 500;
      const message = err instanceof Error ? err.message : "UnknownError";
      res.status(status).json({ error: message });
    }
  };
  me = (req: Request, res: Response): void => {
    res.json(req.user);
  };
  refresh = (req: Request, res: Response): void => {
    try {
      const { accessToken, refreshToken } = this.service.refresh(
        req.cookies.refreshToken,
      );
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
      });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.json({ ok: true });
    } catch (err) {
      const status = err instanceof AppError ? err.status : 500;
      const message = err instanceof Error ? err.message : "UnknownError";
      res.status(status).json({ error: message });
    }
  };
  logout = (_req: Request, res: Response): void => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.json({ ok: true });
  };
}
