import { Request, Response } from "express";
import stripe from 'stripe';
import { User } from '../models/user.model';

export class WebhookController {
    public async stripe(req: Request, res: Response) {
        const stripeSecretKey = `${process.env.STRIPE_SECRET_KEY}`;
        const webhookSecret = `${process.env.STRIPE_WEBHOOK_SECRET}`; 
        const stripeClient = new stripe(stripeSecretKey, { apiVersion: "2023-10-16" });
        const sig = req.headers['stripe-signature'] as string;

        try {
            let event = stripeClient.webhooks.constructEvent(
                req.body,
                sig,
                webhookSecret
            );

            if (event.type === 'payment_intent.succeeded') {
                const paymentIntent = event.data.object;
                const email = paymentIntent.metadata.email;

                await User.updateOne({ email }, { status: 'paid' });

                res.json({ received: true });
            } else {
                res.status(400).send('Event type not supported');
            }
        } catch (error: any) {
            console.error(`Error in Stripe webhook processing: ${error.message}`);
            res.status(400).send(`Webhook Error: ${error.message}`);
        }
    }
}
