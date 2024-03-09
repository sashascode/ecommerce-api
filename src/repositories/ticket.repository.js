import messages from "../resources/messages.js";

export default class TicketRepository {
    constructor(dao) {
        this.dao = dao;
    }
    
    createTicket = async (ticket) => {
        try {
            const res = await this.dao.createTicket(ticket);
            return res;
        }
        catch(error) {
            throw new Error(messages.error.all.CREATE_ERROR + error.message);
        }
    }

    getTicketById = async (id) => {
        try {
            const ticket = await this.dao.getTicketById(id);
            return ticket;
        }
        catch(error) {
            throw new Error(messages.error.all.GET_ERROR + error.message);
        }
    };

    getTickets = async (query, options) => {
        try {
            const tickets = await this.dao.getTickets(query, options);
            return tickets;
        }
        catch(error) {
            throw new Error(messages.error.all.GET_ERROR + error.message);
        }
    };

    updateTicket = async (id, ticket) => {
        try {
            const res = await this.dao.updateTicket(id, ticket);
            return res;
        }
        catch(error) {
            throw new Error(messages.error.all.UPDATE_ERROR + error.message);
        }
    };

    deleteTicket = async (id) => {
        try {
            const res = await this.dao.deleteTicket(id);
            return res;
        }
        catch(error) {
            throw new Error(messages.error.all.DELETE_ERROR + error.message);
        }
    };

    getTicketByCode = async (code) => {
        try {
            const ticket = await this.dao.getTicketByCode(code);
            return ticket;
        }
        catch(error) {
            throw new Error(messages.error.all.GET_ERROR + error.message);
        }
    };

}