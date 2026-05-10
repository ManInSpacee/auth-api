if (!process.env.JWT_ACCESS_SECRET)
  throw new Error("JWT_ACCESS_SECRET is not set");
if (!process.env.JWT_REFRESH_SECRET)
  throw new Error("JWT_REFRESH_SECRET is not set");
if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");

export const config = {
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  databaseUrl: process.env.DATABASE_URL,
};
