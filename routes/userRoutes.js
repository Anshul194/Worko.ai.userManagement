const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');
const validate = require('../middlewares/validateMiddleware');
const { userSchema } = require('../middlewares/validationSchemas');
const authenticate = require('../middlewares/authMiddleware');

userRouter.use(authenticate);

userRouter.get('/', userController.getUsers);
userRouter.get('/:userId', userController.getUserById);
userRouter.post('/', validate(userSchema), userController.createUser);
userRouter.put('/:userId', validate(userSchema), userController.updateUser);
userRouter.patch('/:userId', validate(userSchema), userController.updateUser);
userRouter.delete('/:userId', userController.deleteUser);
userRouter.patch('/:userId/restore', userController.restoreUserById);


module.exports = userRouter;
