import express from "express";
import { forgotPassword, login, register, resetPassword } from "../controllers/middleware/authController.js";
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);

export default router;