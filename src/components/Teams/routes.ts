import express from 'express';
import * as teamController from './controller';

const teamRouter = express.Router();


teamRouter.post('/', teamController.createManyTeams);

teamRouter.get('/', teamController.getTeams);

export default teamRouter;