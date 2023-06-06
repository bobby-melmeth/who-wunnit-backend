import express, { Express, Request, Response } from "express";

import axios, { AxiosRequestConfig } from "axios";
import config from "./src/configs/BaseApiConfig";


const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());


app.get('/', async (req: Request, res: Response) => {
  try {
    const headers = config.headers;
    const requestConfig: AxiosRequestConfig = {
      headers: headers,
    };

    const response = await axios.get(config.apiUrl + 'competitions/competitions/`${WC}`/matches', requestConfig);
    console.log(JSON.stringify(response.data, null, 2))
    // Send the response from the API to the client
    res.send(response.data);

  } catch (error) {
    // Handle the error and send an error response to the client
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
})
