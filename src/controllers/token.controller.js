import { UserService, TokenService } from "../repositories/index.js";
import Mail from "../modules/mail.module.js";
import { compareAsync, generateToken, verifyToken } from "../utils.js";
import { createHash } from "../utils.js";
import { logger } from "../utils/logger.js";
import config from "../config/config.js";
import messages from "../resources/messages.js";

const mailModule = new Mail();

export const sendPasswordLink = async (req, res, next) => {
    try {
        if(!req.body.email) return res.sendBadRequest(messages.error.all.EMAIL_REQUIRED);

        const user = await UserService.getUserByEmail(req.body.email);

        if(!user) return res.sendBadRequest(messages.error.token.USER_NOT_FOUND);

        if(user && user._id) {
            const token = generateToken(user, '1h');
            const result = await TokenService.createToken(user._id, token);
    
            if(result && result._id) {
                const link = config.baseUrl + 'view/reset_password/' + result.userId + "/" + result.token;
    
                await mailModule.sendResetPasswordMail(user, link);
                logger.debug("[Reset Password Link]: " + link);
                res.sendSuccess({ message: messages.success.token.RESET_PASSWORD_SENT});
            }
    
        }
    }
    catch (error) {
        next(error);
    }
}

export const resetPassword = async (req, res, next) => {
    try {
        const { userId, token } = req.params;
        const { newPassword } = req.body;

        const result = await TokenService.getToken(userId, token);

        if(result && result._id && result.token) {
            const tokenDecode = await verifyToken(result.token);

            if(tokenDecode && tokenDecode.hash) {
                const validatePassword = await compareAsync(newPassword, tokenDecode.hash);

                if(validatePassword) {
                    return res.sendBadRequest(messages.error.token.REPEATED_PASSWORD);

                }

                const passwordHashed = await createHash(newPassword);
                await UserService.updateUser(result.userId, { password: passwordHashed });
                await TokenService.deleteToken(result._id);

                return res.sendSuccess({ message: messages.success.token.PASSWORD_RESTORED});
            }

            return res.sendBadRequest(messages.error.token.INVALID_TOKEN);
        }

        return res.sendBadRequest(messages.error.token.INVALID_TOKEN);
    }
    catch (error) {
        next(error);
    }
}