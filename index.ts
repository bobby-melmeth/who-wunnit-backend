import express from "express";
import userRouter from "./src/components/User/routes";
import errorHandler from "./src/utils/errorHandler";
import competitionRouter from "./src/components/League/routes";
import teamRouter from "./src/components/Teams/routes";



const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(errorHandler)

app.use('/users', userRouter);
app.use('/teams', teamRouter)
app.use('/competition', competitionRouter)


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
})
