import mongoose from 'mongoose';
import 'dotenv/config';
import { CartModel } from './cart.model.js';

const userCollection = 'users';

const documentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    reference: { type: String, required: true }
});

const userSchema = new mongoose.Schema(
    {
        first_name: { type: String, required: [true, "Name is required"] },
        last_name: { type: String },
        email: { type: String, required: [true, "Email is required"], unique: true },
        password: { type: String },
        role: { type: String, default: "USER_ROLE", enum: ["ADMIN_ROLE", "USER_ROLE", "PREMIUM_ROLE"] },
        status: { type: Boolean, default: true },
        creationDate: { type: Date, default: Date.now },
        cart: { type: mongoose.Schema.Types.ObjectId, ref: CartModel },
        age: { type: Number, min: 18, max: 65 },
        documents: { type: [ documentSchema ], default: [] },
        last_connection: { type: Date, default: Date.now }
    }
);

userSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        delete ret.__v;
        return ret;
    }
});

// TO-DO: Manejo de logica para last_connection

export const UserModel = mongoose.model(userCollection, userSchema);