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

        if(!paymentIntent) return res.sendServerError('Failed to create payment intent');
        await CartService.purchaseCart(req.user.cart, req.user.email, amount, paymentIntent.id);

        return res.sendSuccess(paymentIntent);
    } catch (error) {
        next(error);
    }
}