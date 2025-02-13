import express from "express";
import { changePassword, forgotPassword, login, register, resetPassword } from "../controllers/authController.js";
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);
router.put('/changepassword', changePassword);
export default router;