const express = require('express');
const authRouter = express.Router();
const { registerUser, loginUser } = require('../controllers/authcontroller');

// @route   POST /api/auth/register
authRouter.post('/register', registerUser);

// @route   POST /api/auth/login
authRouter.post('/login', loginUser);

module.exports = authRouter;