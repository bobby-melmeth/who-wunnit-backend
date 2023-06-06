import { Request, Response } from 'express';
import { User } from './models';
import * as UserService from './services';




export const createUser = async (req: Request, res: Response) => {
  try {
    const userData: User = req.body;
    const newUser: User = await UserService.createUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.id;
    const user: User | null = await UserService.getUserById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.id;
    const updatedData: Partial<User> = req.body;
    const updatedUser: User | null = await UserService.updateUser(userId, updatedData);

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.id;
    const deletedUser: User | null = await UserService.deleteUser(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};