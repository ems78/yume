import express, { Application } from 'express';
import cors from 'cors';
import routes from './routes';
import createMongoClient from './database';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use('/api', routes);

createMongoClient().then((client) => {
    console.log('Connected to database.');
}).catch((err) => {
    console.error('Error connecting to database: ', err);
});

export default app;
