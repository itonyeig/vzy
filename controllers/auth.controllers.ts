import { Request, Response } from "express";
import { httpErrorResponse, httpResponse } from "../utils/helpers";
import { User } from "../models/user.model";
import { createToken } from '../middleware/auth';


export class AuthController {
    public async signup(req: Request, res: Response) {
        try {
            const { email, firstName, lastName, password } = req.body

            const user = new User({email, firstName, lastName, password})

            await user.save()

        return httpResponse(res, 'Signup successful')
        } catch (error: any) {
            if (error.message.startsWith('E11000 duplicate key error collection')) {
                return httpErrorResponse(res, 'Email already exists') 
            }
            return httpErrorResponse(res, error.message)
        }
    }

    public async signin(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

        if (user && await user.isValidPassword(password)) {
            return httpResponse(res, "Login successful", { token: createToken(email) })
        } else {
        return httpErrorResponse(res, "Email or Password incorrect", {}, 401);
        }
        } catch (error: any) {
            return httpErrorResponse(res, error.message)
        }
    }
}