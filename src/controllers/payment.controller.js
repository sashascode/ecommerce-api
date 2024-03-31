import { PaymentService, CartService } from "../repositories/index.js";

export const createPaymentIntent = async (req, res, next) => {
    const { amount, currency } = req.body;

    try {
        if(!amount || !currency) return res.sendBadRequest('Amount and currency are required');

        const paymentInfo = {
            amount: (amount * 100).toFixed(0), // amount is in cents, convert to dollars by multiplying by 100
            currency: currency || 'usd' // default currency is USD
        }

        const paymentIntent = await PaymentService.createPaymentIntent(paymentInfo);
        await CartService.purchaseCart(req.user.cart, req.user.email, amount, paymentIntent.id);

        return res.sendSuccess(paymentIntent);
    } catch (error) {
        next(error);
    }
}

export const handleStripeWebhook = async (req, res, next) => {
    try {
        const sig = req.headers['stripe-signature'];
        const event = req.body;

        await PaymentService.handleStripeWebhook(event, sig);

        return res.sendSuccess('Webhook received');
    } catch (error) {
        next(error);
    }
}

export const stripePayment = async (req, res, next) => {
    const { paymentIntentId } = req.body;

    try {
        const paymentIntent = await PaymentService.confirmPaymentIntent(paymentIntentId);

        return res.sendSuccess(paymentIntent);
    } catch (error) {
        next(error);
    }
}