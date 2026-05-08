export class AppError extends Error {
  constructor(public message: string, public status: number) {
    super(message);
  }

  static notFound(msg = "Not found") {
    return new AppError(msg, 404);
  }

  static badRequest(msg = "Bad request") {
    return new AppError(msg, 400);
  }

  static unauthorized(msg = "Unauthorized") {
    return new AppError(msg, 401);
  }
}
