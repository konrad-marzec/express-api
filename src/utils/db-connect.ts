import config from 'config';
import mongoose from 'mongoose';

import logger from './loggers';

async function connect() {
  const DB_URI = config.get<string>('DB_URI');

  try {
    await mongoose.connect(DB_URI);
    logger.info('Connected to DB!');
  } catch {
    logger.error('Could not connect to DB!');
    process.exit(1);
  }
}

export default connect;
