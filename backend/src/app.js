import express from 'express';
import morgan from 'morgan';
import path from 'path';

import { api, system } from './routes';
import logger from './logger';
import errorHandler from './middlewares/error-handler';

const app = express();

app.use(express.static('./static'));
app.use(morgan('combined', { stream: logger.stream }));

app.use('/api', api);
app.use('/system', system);

app.use(errorHandler);

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'static/index.html'));
});

export default app;
