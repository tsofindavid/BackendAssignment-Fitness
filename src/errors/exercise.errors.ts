export class ExerciseAlreadyStartedError extends Error {
  public readonly status: number = 400;

  constructor(message: string = 'Exercise is already started.') {
    super(message);
  }
}

export class ExerciseNotStartedError extends Error {
  public readonly status: number = 400;

  constructor(message: string = 'Exercise is not started.') {
    super(message);
  }
}

export class ExerciseAlreadyCompletedError extends Error {
  public readonly status: number = 400;

  constructor(message: string = 'Exercise is already completed.') {
    super(message);
  }
}
