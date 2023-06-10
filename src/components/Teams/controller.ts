import { Team } from './Types/TeamTypes';
import * as TeamService from './service';
import { Request, Response } from 'express';

export const createManyTeams = async (req: Request, res: Response) => {
    try {
        const newTeams = await TeamService.createManyTeams();

        res.status(201).json(newTeams);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const getTeams = async (req: Request, res: Response) => {
    try {
        const teams = await TeamService.findManyTeams();
        console.log('TEAMMMS', teams)
        res.status(200).json(teams);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}