export class NotFoundError extends Error {
  public readonly status: number = 404;

  constructor(message: string = 'Not found') {
    super(message);
  }
}

export class BadRequestError extends Error {
  public readonly status: number = 400;

  constructor(message: string = 'Bad request.') {
    super(message);
  }
}

export class PermissionDeniedError extends Error {
  public readonly status: number = 403;

  constructor(message: string = 'Permission denied.') {
    super(message);
  }
}
