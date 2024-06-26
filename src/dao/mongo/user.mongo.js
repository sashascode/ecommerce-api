import { UserModel } from "./models/user.model.js";

export default class UserDAO {
    constructor() {
        this.userModel = UserModel;
    }

    async getUsers() {
        return await this.userModel.find().lean();
    }

    async getUserById(id) {
        return await this.userModel.findById(id);
    }

    async getUserByEmail(email) {
        return await this.userModel.findOne({ email: email });
    }

    async getUserRole(uid) {
        return await this.userModel.findById(uid).select({ role: 1, _id: 0 });
    }

    async createUser(user) {
        return await this.userModel.create({ ...user });
    }

    async updateUser(id, user) { 
        return await this.userModel.findByIdAndUpdate(id, user);
    }

    async deleteUser(id) {
        return await this.userModel.findByIdAndDelete(id);
    }

    async deleteInactiveUsers() {
        return await this.userModel.deleteMany({ last_connection: { $lt: new Date(Date.now() - 172800000) } }); // 172,800,000 = 2 days
    }
}