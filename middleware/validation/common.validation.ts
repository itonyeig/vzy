import { Request, Response, NextFunction } from "express";
import { body, validationResult } from 'express-validator';
import { httpErrorResponse } from "../../utils/helpers";

export const validationErrors = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      return httpErrorResponse(
        res,
        errors.array()[0].msg,
        errors.array()[0],
        422
      );
    }
  
    next();
  }

  export const email = body("email")
  .escape() //will replace certain characters (i.e. <, >, /, &, ', ") with the corresponding HTML entity
  .trim()
  .exists({ checkFalsy: true }) // required field
  .withMessage("email is required")
  .bail() // stops the validation process
  .isEmail()
  .withMessage("Invalid Email")
  .bail()
  .normalizeEmail()
  .toLowerCase();