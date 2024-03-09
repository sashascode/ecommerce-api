import { UserService, CartService } from "../repositories/index.js";
import { generateToken } from "../utils.js";
import { createHash } from "../utils.js";
import CurrentUserDTO from "../DTO/currentUser.dto.js";
import CustomError from "../utils/errors/custom.errors.js";
import { logger } from "../utils/logger.js";
import messages from "../resources/messages.js";
import config from "../config/config.js";

export const registerUser = async (req, res, next) => {
    const { password, confirmPassword } = req.body;

    try 
    {
        if(!req.body.first_name || !req.body.last_name || !req.body.email || !password || !confirmPassword || !req.body.age) {
            res.sendBadRequest(messages.error.all.MISSING_FIELDS);
        }

        if(req.body.age < 18 || req.body.age > 65) res.sendBadRequest(messages.error.user.INVALID_AGE);

        if (password !== confirmPassword) res.sendBadRequest(messages.error.user.PASSWORD_MATCH_ERROR);
    
        const passwordHashed = await createHash(password);
        
        const registerData = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: passwordHashed,
            cart: await CartService.createCart()
        }

        const user = await UserService.registerUser(registerData); 

        if(user && user._id) {
            return res.sendSuccess(user);
        }
        
        return res.sendBadRequest(messages.error.user.REGISTER_ERROR);
    }
    catch (error) 
    {
        next(error);
    }
    
};

export const loginUser = async (req, res, next) => {
    try 
    {
        if (!req.user) CustomError.login();

        const token = generateToken(req.user._doc, '24h');

        res.cookie('access_token', token, {
            httpOnly: true,
            secure: config.environment === 'prod',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        const user = new CurrentUserDTO(req.user._doc);

        return res.sendSuccess(user);
    }
    catch (error) 
    {
        next(error);
    }
    
};

export const loginGithub = async (req, res) => {
    const token = generateToken(req.user._doc, '24h');

    res.cookie('access_token', token, {
        httpOnly: true,
        secure: config.environment === 'prod',
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    res.redirect("/view/products");
}

export const logoutUser = async (req, res) => {
    res.clearCookie('access_token');
    res.sendSuccess({ message: messages.success.user.LOGOUT_SUCCESS });
};

export const getCurrentUser = async (req, res) => {
    if(!req.user) return res.sendNoAuthenticatedError({ message: "Unauthorized" });
    
    let user = await UserService.getUserByEmail(req.user.email);
    user = new CurrentUserDTO(user);

    res.sendSuccess(user);
}

export const updateUserRole = async (req, res) => {
    const { uid } = req.params;

    if (!uid) {
        return res.sendBadRequest(messages.error.all.INVALID_ID);
    }

    const role = await UserService.getUserRole(uid);

    if (role && role.role === 'ADMIN_ROLE') {
        return res.sendBadRequest(messages.error.user.ADMIN_ROLE_CHANGE);
    }

    const newRole = role && role.role === 'PREMIUM_ROLE' ? 'USER_ROLE' : 'PREMIUM_ROLE';

    const result = await UserService.updateUser(uid, { role: newRole });

    res.sendSuccess(result);
}