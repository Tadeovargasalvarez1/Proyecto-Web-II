// Error operativo con código HTTP, gestionado por errorHandler.
export class AppError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}
