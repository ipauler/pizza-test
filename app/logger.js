const winston = require('winston');
const config = require('./config/config');


module.exports = () => {

  const rotateTransport = new winston.transports.File({
    filename: config.LOG_FILE, // this path needs to be absolute
    colorize: true,
    timestamp: true,
    json: true,
    size: '100m',
    keep: 10,
    compress: true
  });

  const transports = [rotateTransport];

  if (config.LOG_CONSOLE) {
    transports.push(new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
    }));
  }

  const logger = winston.createLogger({
    transports: transports,
    level: config.LOG_LEVEL || 'info'
  });

  return logger;
}
