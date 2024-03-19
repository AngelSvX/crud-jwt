const express = require('express');
const userRouter = express.Router();

const userController = require('../controllers/userControllers');

userRouter.post('/create', userController.createUser)
userRouter.get('/empleados', userController.getUser)
userRouter.put('/update', userController.updateUser)
userRouter.delete('/delete/:id', userController.deleteUser)

module.exports = userRouter