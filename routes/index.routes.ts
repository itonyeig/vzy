import { Request, Response, Application } from "express";
import { AuthRoutes } from "./auth.routes";
import { ProfileRoutes } from "./profile.routes";
import { WebhookRoutes } from "./webhook.routes";

export class Routes {
  public authRoutes = new AuthRoutes();
  public profileRoutes = new ProfileRoutes();
  public webhookRoutes = new WebhookRoutes();
  

  public routes(app: Application): void {
    app.route("/").get((req: Request, res: Response) => {
      res.status(200).send({
        message: "VZY Bacend Test",
      });
    });

    this.authRoutes.routes(app);
    this.profileRoutes.routes(app);
    this.webhookRoutes.routes(app);
    
  }
}
