import express from 'express';
import * as controller from './controller';

const router = express.Router();


router.post('/', controller.createUser);


router.get('/:id', controller.getUserById);


router.put('/:id', controller.updateUser);


router.delete('/:id', controller.deleteUser);

export default router;