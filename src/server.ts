import express from 'express';

import deserializeUser from './middleware/deserialize-user';

const app = express();

app.use(express.json());
app.use(deserializeUser);

export default app;
