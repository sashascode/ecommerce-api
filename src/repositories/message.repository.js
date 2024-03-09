import messages from "../resources/messages.js";

export default class MessageRepository {
    constructor(dao) {
        this.dao = dao;
    }

    saveMessage = async ({ user, message }) => {
        try {
            if(!user || !message) {
                throw new Error("You must fill all the required fields.");
            }
    
            const messageDoc = {
                user,
                message
            };
    
            const res = await this.dao.createMessage(messageDoc);

            return res._id;
        }
        catch(error) {
            throw new Error(messages.error.all.CREATE_ERROR + error.message);
        }   
    }

    getAllMessages = async () => {
        try {
            return await this.dao.getMessages();
        }
        catch(error) {
            throw new Error(messages.error.all.GET_ERROR + error.message);
        };
    };
}