const express = require('express')
const authRouter = express.Router();

const authController = require('../controllers/authControllers')

authRouter.get('/auth', authController.getAuthUser)
authRouter.post('/login', authController.postAuthUser)

module.exports = authRouter