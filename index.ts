import express, { Request, Response } from "express";
import userRouter from "./src/components/User/routes";
import errorHandler from "./src/utils/errorHandler";
import competitionRouter from "./src/components/League/routes";
import teamRouter from "./src/components/Teams/routes";
import { restResponseTimeHistogram, startMetricsServer } from "./src/utils/metrics";
import responseTime from 'response-time'



const app = express();
const port = process.env.PORT || 8088;


app.use(express.json());
app.use(errorHandler)

app.use('/users', userRouter);
app.use('/teams', teamRouter)
app.use('/competition', competitionRouter)
app.use(
  responseTime((req: Request, res: Response, time: number) => {
    if (req?.route?.path) {
      restResponseTimeHistogram.observe(
        {
          method: req.method,
          route: req.route.path,
          status_code: res.statusCode,
        },
        time * 1000
      );
    }
  })
);


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
  startMetricsServer()
})


