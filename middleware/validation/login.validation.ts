import { body } from "express-validator";
import { email, validationErrors } from "./common.validation";


export const signinValidation = [
    email,
    body("password")
    .escape()
    .trim()
    .exists({ checkFalsy: true })
    .withMessage("password is required")
    .bail(),
    validationErrors
]