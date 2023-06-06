import express from 'express';
import * as controller from './controller';

const router = express.Router();

// Create a new user
router.post('/', controller.createUser);

// Get user by ID
router.get('/:id', controller.getUserById);

// Update user
router.put('/:id', controller.updateUser);

// Delete user
router.delete('/:id', controller.deleteUser);

export default router;