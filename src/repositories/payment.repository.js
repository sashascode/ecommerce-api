import Stripe from 'stripe';
import config from '../config/config.js';
import { logger } from '../utils/logger.js';
import messages from '../resources/messages.js';
import CustomError from '../utils/errors/custom.errors.js';

const stripe = new Stripe(config.stripe.secretKey);

export default class PaymentRepository {
    constructor() {
        this.stripe = stripe;
    }

    createPaymentIntent = async (paymentInfo) => {
        try {
            const { amount, currency } = paymentInfo;

            const paymentIntent = await this.stripe.paymentIntents.create({
                amount,
                currency,
                payment_method_types: ['card']
            });

            return paymentIntent;
        } catch (error) {
            logger.error(error.message);
            throw new CustomError(messages.error.all.CREATE_ERROR + error.message);
        }
    };

    confirmPaymentIntent = async (paymentIntentId) => {
        try {
            const paymentIntent = await this.stripe.paymentIntents.confirm(paymentIntentId);

            return paymentIntent;
        } catch (error) {
            logger.error(error.message);
            throw new CustomError(messages.error.all.CREATE_ERROR + error.message);
        }
    };
}