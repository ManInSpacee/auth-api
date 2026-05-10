import { JwtUser } from "./jwt.types";

declare module "express-serve-static-core" {
  interface Request {
    user?: JwtUser;
  }
}
