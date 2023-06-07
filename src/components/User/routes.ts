import express from 'express';
import * as controller from './controller';

const userRouter = express.Router();


userRouter.post('/', controller.createUser);

userRouter.get('/', controller.getUsers);

userRouter.get('/:id', controller.getUserById);

userRouter.put('/:id', controller.updateUser);

userRouter.delete('/:id', controller.deleteUser);

export default userRouter;