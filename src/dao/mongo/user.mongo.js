import { UserModel } from "./models/user.model.js";

export default class UserDAO {
    constructor() {
        this.userModel = UserModel;
    }

    async getUsers() {
        return await this.userModel.find();
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

    async deleteUser(email) {
        return await this.userModel.findOneAndDelete({ email: email });
    }
}