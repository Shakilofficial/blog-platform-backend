import { JwtPayload } from 'jsonwebtoken';
// Extend the Express Request interface with JWT user payload
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
