import { Request, Response, NextFunction } from 'express';

const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error);

  if (res.headersSent) {
    // If headers have already been sent, delegate to the default error handler
    return next(error);
  }

  // Handle specific known errors
  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }

  // Handle other unknown errors
  res.status(500).json({ error: 'Internal Server Error' });
};

export default errorHandler;