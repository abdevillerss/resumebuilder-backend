

const express = require('express');
const authRouter = express.Router(); 
const { registerUser, loginUser } = require('../controllers/authcontroller'); 


authRouter.post('/register', registerUser);

// @route   /api/auth/login
authRouter.post('/login', loginUser);

module.exports = authRouter;


