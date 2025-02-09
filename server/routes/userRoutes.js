import express from "express";
const router = express.Router();
import { getUsers, getUserById, updateUser, deleteUser }  from "../controllers/userController.js";

router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default  router;