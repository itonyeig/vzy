import { Request, Response } from "express";
import { httpErrorResponse, httpResponse, removeUndefinedObjValues } from "../utils/helpers";
import { User } from "../models/user.model";

export class ProfileController {

    public async updateProfile(req: Request, res: Response) {
        try {
            const { email } = req.user;
            const { firstName, lastName, phone } = req.body;
            const data = removeUndefinedObjValues({ firstName, lastName, phone })
            const updateProfile = await User.findOneAndUpdate(
                {
                email
                },
                data,
                {
                    runValidators: true,
                    omitUndefined: true,
                    new: true, // return new updated user if user found
                    useFindAndModify: false,
                  }
            ).select('-password');

            return httpResponse(res, "Profile updated", updateProfile)

        } catch (error: any) {
            return httpErrorResponse(res, error.message)
        }
    }
}