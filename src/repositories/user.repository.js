import { logger } from "../utils/logger.js";
import messages from "../resources/messages.js";

export default class UserRepository {
    constructor(userDao, mailModule) {
        this.userDao = userDao;
        this.mailModule = mailModule;
    }

    getUserByEmail = async (email) => {
        try {
            logger.info(email)
            return await this.userDao.getUserByEmail(email);
        }
        catch (error) {
            logger.error(messages.error.all.GET_ERROR + error);
            throw error;
        }
    }

    getUserById = async (id) => {
        try {
            return await this.userDao.getUserById(id);
        }
        catch (error) {
            logger.error(messages.error.all.GET_ERROR + error);
            throw error;
        }
    }
    
    registerUser = async (user) => {
        try {
            const response = await this.userDao.createUser(user);

            if(response && response._id) {
                this.mailModule.sendNewUserMail(response);
            }

            return response;
        }
        catch (error) {
            logger.error('Error while registering user: ' + error);
            throw error;
        }
    }

    updateUser = async (userId, user) => {
        try {
            return this.userDao.updateUser(userId, user);
        }
        catch (error) {
            logger.error(error);
            throw error;
        }
    }

    getUserRole = async (userId) => {
        try {
            return this.userDao.getUserRole(userId);
        }
        catch (error) {
            logger.error(error);
            throw error;
        }
    }

    getUsers = async () => {
        try {
            return this.userDao.getUsers();
        }
        catch (error) {
            logger.error(error);
            throw error;
        }
    }

    deleteInactiveUsers = async () => {
        try {
            return this.userDao.deleteInactiveUsers();
        }
        catch (error) {
            logger.error(error);
            throw error;
        }
    }

    deleteUser = async (userId) => {
        try {
            return this.userDao.deleteUser(userId);
        }
        catch (error) {
            logger.error(error);
            throw error;
        }
    }
}
