import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Token from "../models/interfaces/token";
import { User } from "../models/user.model";

const getToken = (req: Request) => {
    if (!req.headers.authorization ||req.headers.authorization.trim().length === 0) {
      return null;
    }
    // expects authorization header to contain value such as `Bearer {token}`
    return req.headers.authorization.split(" ")[1];
};

const deriveError = (err: any) => {
const message =
    err instanceof jwt.TokenExpiredError
    ? "Your token has expired!"
    : "Invalid token";
return {
    status: 401,
    message,
};
};

const checkAuth = async (req: Request) => {
  const token = getToken(req);
  let error = null;
  try {
    if (token) {
      const decoded = jwt.verify(token,process.env.JWT_SECRET as jwt.Secret) as Token;

      let user = await User.findOne({ email: decoded.email }, "-password -__v");
      if (user != null) {
        req.user = user;        
      } else {
        error = {
          status: 401,
          message: "User not found",
        };
      }
    } else {
      error = {
        status: 401,
        message: "Bearer token required",
      };
    }
  } catch (err) {
    error = deriveError(err);
  }
  return error;
};

export const createToken = (email: string): string => {
  return jwt.sign({ email }, process.env.JWT_SECRET as jwt.Secret, {
    expiresIn: "1m",
  });
};

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const error = await checkAuth(req);
  //   console.log(req.user);

  if (!error) {
    return next();
  }
  return res.status(401).json(error);
};

export default authenticate
