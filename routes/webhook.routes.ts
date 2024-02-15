import { WebhookController } from "../controllers/webhook.controllers";
import { Application } from "express";
import bodyParser from "body-parser";


export class WebhookRoutes {
    public webhookController: WebhookController = new WebhookController();
    public routes(app: Application): void {
        app.route('/webhook/stripe',).post(bodyParser.raw({type: 'application/json'}), this.webhookController.stripe)
    }
}