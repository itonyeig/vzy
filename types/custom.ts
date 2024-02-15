import { UserM } from '../models/user.model';

declare global {
    namespace Express {
      export interface Request {
        user: UserM;
      }
    }
  }