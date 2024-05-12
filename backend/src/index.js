import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import { connectToDatabase } from './app/dbConnector.service.js';
import { accountRoute } from './routes/account.route.js';
import { mealRoute } from './routes/meal.route.js';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use('/api/v1/users', accountRoute);
app.use('/api/v1/meals', mealRoute);

connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(
        `[server]: Server is running at http://localhost:${port}/api`,
      );
    });
  })
  .catch(err => console.log(err));