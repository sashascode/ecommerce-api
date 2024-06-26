import { logger } from "../utils/logger.js";
import messages from "../resources/messages.js";
import CustomError from "../utils/errors/custom.errors.js";

export default class CartRepository {
    constructor(cartDao, productDao, ticketDao) {
        this.cartDao = cartDao;
        this.productDao = productDao;
        this.ticketDao = ticketDao;
    }

    createCart = async () => {
        try {
            const cart = {
                products: []
            };

            const res = await this.cartDao.createCart(cart);

            return res;
        }
        catch(error) {
            throw new Error(messages.error.all.CREATE_ERROR + error.message);
        }
        
    }

    getCartById = async (id) => {
        const cart = await this.cartDao.getCartById(id);

        if (!cart) {
            CustomError.documentNotFound();
        }

        return cart;
    };

    addProductToCart = async (cid, pid, quantity) => {
        try {
            const isProductInCart = await this.cartDao.getProductById(cid, pid);
            let res;

            if(isProductInCart !== null) {
                res = await this.cartDao.updateProductQuantity(cid, pid, quantity || 1);
            } else {
                const newProduct = {
                    id: pid,
                    quantity: 1
                };

                res = await this.cartDao.addProductToCart(cid, newProduct);
            }
    
            return res;
        } catch (error) {
            console.error(error.message);
        }
    };

    deleteProductFromCart = async (cid, pid) => {
        try {
            const updatedCart = await this.cartDao.deleteProductFromCart(cid, pid);
    
            if (!updatedCart) {
                CustomError.documentNotFound(messages.error.cart.PRODUCT_NOT_FOUND);
            }

            return updatedCart;
        } catch (error) {
            throw new Error(messages.error.cart.PRODUCT_DELETE_ERROR + error.message);
        }
    };    

    updateCart = async (cid, products) => {
        const updatedCart = await this.cartDao.updateCart(cid, products);

        if (!updatedCart) {
            CustomError.documentNotFound();
        }

        return updatedCart;
    };

    deleteCart = async (cid) => {
        try {
            const res = this.cartDao.deleteCart(cid);

            return res;
        } catch (error) {
            throw new Error(messages.error.all.DELETE_ERROR + error.message);
        }
    }

    getCartSubtotal = async (cid) => {
        try {
            const cart = await this.getCartById(cid);
            const products = cart.products;
            let subtotal = 0;

            products.forEach(product => {
                subtotal += product.id.price * product.quantity;
            });

            return subtotal.toFixed(2);
        } catch (error) {
            throw new Error(messages.error.cart.GET_SUBTOTAL_ERROR + error.message);
        }
    }

    purchaseCart = async (cid, userEmail, amount, paymentIntentId) => {
        let productsOutOfStock = [];
        let productsPurchased = [];

        try {
            const cart = await this.getCartById(cid);
            const products = cart.products;
            
            for (const product of products) {
                const pid = product.id._id;
                const quantity = product.quantity;
                const hasStock = await this.validateProductStock(pid, quantity);

                if (hasStock) {
                    logger.debug(`Product ${pid} has sufficient stock`);
                    await this.productDao.updateProductStock(pid, -quantity);
                    productsPurchased.push({ id: pid, quantity: quantity });
                } else {
                    productsOutOfStock.push({ id: pid, quantity: quantity });
                }
            }

        } catch (error) {
            throw new Error(messages.error.cart.PURCHASE_ERROR + error.message);
        } finally {
            // logger.debug("productsPurchased:", productsPurchased)

            const purchase = {
                items: productsPurchased,
                amount,
                purchase_datetime: new Date(),
                purchaser: userEmail,
                pi_id: paymentIntentId,
                status: 1 // 0: cancelled, 1: pending, 2: completed
            };

            const ticket = await this.ticketDao.createTicket(purchase);
            await this.updateCart(cid, productsOutOfStock);
            
            return { ticket, products_out_of_stock: productsOutOfStock }
        }
    }

    validateProductStock = async (pid, quantity) => {
        try {
            const product = await this.productDao.getProductById(pid);
            const stock = product.stock;

            if(quantity > stock) {
                logger.debug(`Product ${pid} has insufficient stock`);
                return false;
            }

            return true;
        } catch (error) {
            throw new Error(messages.error.cart.VALIDATE_STOCK_ERROR + error.message);
        }
    }
    
}