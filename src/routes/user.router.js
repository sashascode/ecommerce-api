import Router from "./router.js";
import { 
    getUsers,
    getCurrentUser,
    loginGithub,
    loginUser, 
    logoutUser, 
    registerUser,
    updateUserRole,
    switchToPremium,
    deleteInactiveUsers,
    deleteUser
} from "../controllers/user.controller.js";
import passport from "passport";

export default class UserRouter extends Router {
    init() {
        this.get("/", ["PUBLIC"], getUsers);
        this.post("/register", ["PUBLIC"], registerUser);
        this.post("/login", ["PUBLIC"], passport.authenticate('login', { session: false }), loginUser);
        this.post("/logout", ["USER_ROLE", "ADMIN_ROLE", "PREMIUM_ROLE"], logoutUser);
        this.get("/github", ["PUBLIC"], passport.authenticate("github", { scope: ["user:email"], session: false }), async (req, res) => {});
        this.get("/callbackgithub", ["PUBLIC"], passport.authenticate("github", { session: false }), loginGithub);
        this.get("/current", ["USER_ROLE", "ADMIN_ROLE", "PREMIUM_ROLE"], getCurrentUser);
        this.put("/premium/:uid", ["USER_ROLE", "PREMIUM_ROLE"], switchToPremium);
        this.put("/:role/:uid", ["ADMIN_ROLE"], updateUserRole);
        this.delete("/", ["ADMIN_ROLE"], deleteInactiveUsers);
        this.delete("/:uid", ["ADMIN_ROLE"], deleteUser);
    }
}