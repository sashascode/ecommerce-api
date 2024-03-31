import Router from './router.js';

import {
    createPaymentIntent,
} from '../controllers/payment.controller.js';

export default class PaymentRouter extends Router {
    init() {
        this.post('/payment-intent', ['USER_ROLE', 'PREMIUM_ROLE'], createPaymentIntent);
    }
}