import { CartService, MessageService, ProductService, UserService, TicketService } from '../repositories/index.js';
import Mail from "../modules/mail.module.js";
import { logger } from '../utils/logger.js';

const mailModule = new Mail();

export const getProducts = async (req, res) => {
    const { limit, page, sort, query } = req.query;
    
    const data = await ProductService.getProducts(limit, page, sort, query, '/view/');

    return res.render('productList', { 
        products: data.productList, 
        totalPages: data.totalPages, 
        currentPage: data.page, 
        hasPrevPage: data.hasPrevPage, 
        hasNextPage: data.hasNextPage, 
        prevLink: data.prevLink, 
        nextLink: data.nextLink 
    });
};

export const getRealTimeProducts = async (req, res) => {
    const data = await ProductService.getProducts(40);

    return res.render('realTimeProducts', { products: data.productList });
};

export const getCartById = async (req, res) => {
    const data = await CartService.getCartById(req.params.cid);
    
    return res.render('cart', { cart: data });
};

export const getLoginView = async (req, res) => {
    return res.render('login');
};

export const getRegisterView = async (req, res) => {
    return res.render('register');
}

export const getHomeView = async (req, res) => {
    res.render('home');
};

export const getMessages = async (req, res) => {
    const messages = await MessageService.getAllMessages();
    res.render("chat", { messages });
};

export const getResetPasswordView = async (req, res) => {
    const { userId, token } = req.params;
    res.render("resetPassword", { userId, token });
}

export const getUsersView = async (req, res) => {
    const users = await UserService.getUsers();

    res.render("user", { users });
}

export const getCheckoutView = async (req, res) => {
    res.render("checkout");
}

export const getOrderConfirmationView = async (req, res) => {
    const {payment_intent} = req.query;

    const ticket = await TicketService.updateTicketStatus(payment_intent, 2);
    mailModule.sendOrderConfirmationMail(req.user, ticket);
    logger.info(ticket);

    res.render("orderConfirmation", { ticket, orderId: payment_intent });
}