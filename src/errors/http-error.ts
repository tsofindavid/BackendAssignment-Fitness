export class NotFoundError extends Error {
  public readonly status: number = 404;
}

export class BadRequestError extends Error {
  public readonly status: number = 400;
}
