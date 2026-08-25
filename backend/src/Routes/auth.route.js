import expees from "express"
import { getme, login, logout, register, verifyEmail } from "../Controller/auth.controller.js";
import { loginValidationRules, registerValidationRules } from "../Validator/auth.validator.js";
import { userauth } from "../Middleware/auth.middleware.js";

const authRoute=expees.Router()

authRoute.post('/registration',registerValidationRules(),register);

authRoute.post('/login', loginValidationRules(), login);
authRoute.post('/logout', logout);

authRoute.get('/get-me',userauth, getme);
authRoute.get('/verify-email', verifyEmail);



export default authRoute
