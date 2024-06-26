import { TicketModel } from "./models/ticket.model.js";
import { ProductModel } from "./models/product.model.js";

export default class TicketDAO {
    constructor() {
        this.ticketModel = TicketModel;
    }

    async getTickets(query, options) {
        return await this.ticketModel.paginate(query, options);
    }

    async getTicketById(id) {
        return await this.ticketModel.findById(id).lean();
    }

    async getTicketByPiId(pi_id) {
        return await this.ticketModel.find({ pi_id }).lean();
    }

    async getTicketByCode(code) {
        return await this.ticketModel.find({ code });
    }

    async createTicket(ticket) {
        try {
            return await this.ticketModel.create(ticket);
        }
        catch(error) {
            throw new Error('Error while creating a ticket: ' + error.message);
        }
    }

    async updateTicket(id, ticket) {
        return await this.ticketModel.findByIdAndUpdate(id, ticket, { new: true }).lean();
    }

    async deleteTicket(id) {
        return await this.ticketModel.findByIdAndDelete(id).lean();
    }

    async updateTicketStatus(pi_id, status) {
        return await this.ticketModel.findOneAndUpdate({
            pi_id
        }, {
            status: status
        }, {
            new: true
        }).populate({ path: 'items.id', model: ProductModel}).lean();   
    }
}