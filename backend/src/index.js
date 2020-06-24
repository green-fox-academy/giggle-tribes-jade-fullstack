import logger from './logger';
import app from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`App is listening on ${PORT}`);
});
