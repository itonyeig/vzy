import { Application } from "express";
import authenticate from '../middleware/auth';
import { ProfileController } from '../controllers/profile.controllers';
import { validateUpdateProfile } from '../middleware/validation/profile.vaidation';

export class ProfileRoutes {
    public profileController: ProfileController = new ProfileController();
    public routes(app: Application): void {
        app.route('/profile/edit').put([authenticate, ...validateUpdateProfile], this.profileController.updateProfile)
    }
}