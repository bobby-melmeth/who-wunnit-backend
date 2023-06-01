import express,  {Express, Request, Response } from "express";

import axios, { AxiosRequestConfig } from "axios";
import config from "./src/configs/BaseApiConfig";


import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


const app: Express  = express();
const port = process.env.PORT;



app.get('/', async (req: Request, res: Response) => {
  try {
    const headers = config.headers;
    const requestConfig: AxiosRequestConfig = {
      headers: headers,
    };

    const response = await axios.get(config.apiUrl + 'competitions', requestConfig);
    console.log(response.data.competitions)
    // Send the response from the API to the client
    res.send(response.data.competitions);

  } catch (error) {
    // Handle the error and send an error response to the client
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});