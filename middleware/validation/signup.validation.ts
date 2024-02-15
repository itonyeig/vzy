import { body } from 'express-validator';
import { validationErrors, email } from './common.validation';

export const validateSignup = [
    email,
    body("firstName")
    .escape()
    .trim()
    .exists({ checkFalsy: true })
    .withMessage("firstName is required")
    .bail(),
  body("lastName")
    .escape()
    .trim()
    .exists({ checkFalsy: true })
    .withMessage("lastName is required")
    .bail(),
  body("password")
    .escape()
    .trim()
    .exists({ checkFalsy: true })
    .withMessage("password is required")
    .bail()
    .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
      .withMessage('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one symbol'),
  body("phone")
    .optional()
    .escape()
    .trim()
    .customSanitizer((value) => value.replaceAll(" ", "")) //remove ALL blank spaces
    .isMobilePhone("any")
    .withMessage("not a valid phone number"),
  


    validationErrors,
]