if(!process.env.ALREADY_SET) {
    require('dotenv').config();
  }

  import * as http from 'http';
  import { app } from './app';
  import {  DatabaseService } from './app/services/databaseService';
  import { logger } from './lib/logger';

  const logger = new Logger()

  const server = http.createServer(app).listen(parseInt(process.env.PORT || 3000, 10));

  server.on('listening', async () => {
      await DatabaseService.getConnection();
      logger.log('info', `Server is listening on port ${JSON.stringify(server.address())}`);

  })
