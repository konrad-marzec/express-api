import config from 'config';

import routes from './src/routes';
import app from './src/server';
import connect from './src/utils/db-connect';
import logger from './src/utils/loggers';

const PORT = config.get<number>('PORT');

app.listen(PORT, async () => {
  logger.info(`App is running at http://localhost:${PORT}`);

  await connect();

  routes(app);
});
