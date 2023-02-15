import Express, { Request, Response, Application } from "express";
import DotEnv from 'dotenv';

DotEnv.config();
const App:Application = Express();

App.get('/', (req: Request, res: Response): void => {
    res.send('Working!');
});

const CONN_PORT = process.env.PORT || 3524;
App.listen(
    CONN_PORT,
    (): void => { console.log(`Server Running At http://localhost:${CONN_PORT}`); }
);