import { CartService, ProductService } from "../repositories/index.js";
import CustomError from "../utils/errors/custom.errors.js";
import { isValid24HexString } from "../utils.js";
import messages from "../resources/messages.js";
import Mail from "../modules/mail.module.js";

const mailModule = new Mail();

export const createCart = async (req, res) => {
    try {
        const result = await CartService.createCart();
        return res.sendSuccess(result);
    }
    catch(error) {
        return res.sendServerError(error);
    }
    
};

export const getCartById = async (req, res, next) => {
    const cid = req.params.cid;

    if(!isValid24HexString(cid)) return res.sendBadRequest(messages.error.all.INVALID_ID);
    if(req.user && req.user.cart !== cid) return res.sendForbidden();

    try {
        const result = await CartService.getCartById(cid);
        return res.sendSuccess(result);
    }
    catch(error) {
        next(error);
    }
};

export const updateCart = async (req, res, next) => {
    const cid = req.params.cid;

    try {
        const result = await CartService.updateCart(cid, req.body);
        return res.sendSuccess(result);
    }
    catch(error) {
        next(error);
    }
};

export const deleteCart = async (req, res, next) => {
    const cid = req.params.cid;

    try {
        const result = await CartService.deleteCart(cid);
        return res.sendSuccess(result);
    }
    catch(error) {
        next(error);
    }
};

export const addProductInCart = async (req, res, next) => {
    const cid = req.params.cid;
    const pid = req.params.pid;

    const quantity = parseInt(req.body.quantity);

    try {
        if(!quantity) {
            throw new Error(messages.error.cart.QUANTITY_REQUIRED);
        }

        const result = await CartService.addProductToCart(cid, pid, quantity);
        return res.sendSuccess(result);
    }
    catch(error) {
        next(error);
    }
};

export const addNewProductToCart = async (req, res, next) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const user = req.user.email;

    try {
        const pOwner = await ProductService.getProductOwner(pid);  
        if(pOwner.owner == user) {
            return res.sendBadRequest(messages.error.cart.OWN_PRODUCT_ERROR);
        }      

        const result = await CartService.addProductToCart(cid, pid);
        return res.sendSuccess(result);
    }
    catch(error) {
        next(error);
    }
};

export const deleteProductFromCart = async (req, res, next) => {
    const cid = req.params.cid;
    const pid = req.params.pid;

    try {
        const result = await CartService.deleteProductFromCart(cid, pid);
        return res.sendSuccess(result);
    }
    catch(error) {
        next(error);
    }
};

export const purchaseCart = async (req, res, next) => {
    const cid = req.params.cid;
    const userEmail = req.user.email;

    try {
        if(!userEmail || !cid) {
            CustomError.createOrder({ email: userEmail, cid });
        }

        const result = await CartService.purchaseCart(cid, userEmail);

        mailModule.sendOrderConfirmationMail(req.user, result.ticket);

        return res.sendSuccess(result);
    }
    catch(error) {
        next(error);
    }
    
}
