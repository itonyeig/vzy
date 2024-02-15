import { body } from "express-validator";
import { validationErrors } from "./common.validation";


export const validateUpdateProfile = [
    body("firstName")
    .optional()
    .escape()
    .trim()
    .isString(),
  body("lastName")
  .optional()
    .escape()
    .trim()
    .isString(),

  body("phone")
    .optional()
    .escape()
    .trim()
    .customSanitizer((value) => value.replaceAll(" ", "")) //remove ALL blank spaces
    .isMobilePhone("any")
    .withMessage("not a valid phone number"),


    validationErrors,
]