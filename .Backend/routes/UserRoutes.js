// routes/UserRoutes.js
import express from 'express';
import { activateEmail, createUser, loginUser } from '../controllers/UserController.js';

const router = express.Router();

router.post('/register', createUser); // Register route
router.post('/login', loginUser);     // Login route

// Route to activate user
router.post('/activation/', activateEmail);

export default router;





