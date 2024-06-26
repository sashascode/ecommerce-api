import Router from "./router.js";
import { 
    getHomeView, 
    getLoginView, 
    getProducts, 
    getRealTimeProducts, 
    getRegisterView, 
    getCartById, 
    getMessages, 
    getResetPasswordView,
    getUsersView,
    getCheckoutView,
    getOrderConfirmationView
} from "../controllers/view.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

export default class ViewRouter extends Router {
    init() {
        this.get("/", ['PUBLIC'], getHomeView);
        this.get("/products", ['PUBLIC'], getProducts);
        this.get("/realtimeproducts", ['ADMIN_ROLE', 'PREMIUM_ROLE'], getRealTimeProducts);
        this.get("/cart/:cid", ['USER_ROLE', 'PREMIUM_ROLE'], getCartById);
        this.get("/login", ['PUBLIC'], isAuthenticated, getLoginView);
        this.get("/register", ['PUBLIC'], isAuthenticated, getRegisterView);
        this.get("/chat", ['USER_ROLE', 'PREMIUM_ROLE'], getMessages);
        this.get("/reset_password/:userId/:token", ['PUBLIC'], getResetPasswordView);
        this.get("/admin/users", ['ADMIN_ROLE'], getUsersView);
        this.get("/checkout", ['USER_ROLE', 'PREMIUM_ROLE'], getCheckoutView);
        this.get("/order-confirmation", ['USER_ROLE', 'PREMIUM_ROLE'], getOrderConfirmationView);
    }
}