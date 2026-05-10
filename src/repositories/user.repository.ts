import { prisma } from "../lib/prisma";

export class UserRepository {
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }
  async create(email: string, name: string, hashPassword: string) {
    const user = await prisma.user.create({
      data: { email, name, hashPassword },
    });
    return user;
  }
}
