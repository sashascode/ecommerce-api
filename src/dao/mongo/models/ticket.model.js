import mongoose from "mongoose";

const ticketCollection = "tickets";

const ticketSchema = new mongoose.Schema({
    purchase_datetime: { type: Date, required: true },
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true, max: 100 },
    items: { 
        type: [
            {
                _id: false,
                id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'products'
                },
                quantity: {
                    type: Number,
                    required: [true, "Quantity is required"]
                }
            }
        ],
        default: []
    },
    pi_id: { type: String, required: true },
    status: { type: Number, default: 1, enum: [0, 1, 2]} // 0: cancelled, 1: pending, 2: completed
});

export const TicketModel = mongoose.model(ticketCollection, ticketSchema);