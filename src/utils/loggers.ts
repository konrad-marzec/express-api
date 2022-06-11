import config from 'config';
import dayjs from 'dayjs';
import pino from 'pino';

const transport = pino.transport({
  target: 'pino-pretty',
  options: { colorize: true },
});

const logger = pino(
  {
    level: config.get<string>('LOG_LEVEL'),
    base: {
      pid: false,
    },
    timestamp: () => `, "time":"${dayjs().format()}"`,
  },
  transport,
);

export default logger;
