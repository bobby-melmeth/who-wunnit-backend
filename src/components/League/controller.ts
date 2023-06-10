import { Request, Response } from 'express';
import { createManyTeams } from '../Teams/service';




export async function createCompetition(_: Request, res: Response): Promise<void> {
  try {
    // const aswd = await createManyTeams();

  } catch (error) {
    console.error('Error syncing competition:', error);
    res.status(500).json({ error: 'Failed to sync competition' });
  }
}