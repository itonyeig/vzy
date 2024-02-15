import { validateSignup } from "../middleware/validation/signup.validation";
import { AuthController } from "../controllers/auth.controllers";
import { Application } from "express";
import { signinValidation } from "../middleware/validation/login.validation";
// import { } from "../middlewares/validation/auth.validation";

export class AuthRoutes {
  public authController: AuthController = new AuthController();
  public routes(app: Application): void {
    app.route('/auth/sign-up').post(validateSignup, this.authController.signup)
    app.route('/auth/sign-in').post(signinValidation, this.authController.signin)
  }
}
