// Custom error class for handling errors in the application
class AppError extends Error {
  public statusCode: number;
  // Constructor to initialize the class with status code, message and stack
  constructor(statusCode: number, message: string, stack = '') {
    super(message);
    this.statusCode = statusCode;
    // Capture stack trace if stack is not provided
    if (stack) {
      this.stack = stack;
    } else {
      // Capture stack trace
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default AppError;
