import Router from './router.js';

import {
    createPaymentIntent,
    handleStripeWebhook,
    stripePayment
} from '../controllers/payment.controller.js';

export default class PaymentRouter extends Router {
    init() {
        this.post('/payment', ['USER_ROLE', 'PREMIUM_ROLE'], stripePayment);

        this.post('/payment-intent', ['USER_ROLE', 'PREMIUM_ROLE'], createPaymentIntent);

        this.post('/webhook', ['USER_ROLE', 'PREMIUM_ROLE'], handleStripeWebhook);
    }
}