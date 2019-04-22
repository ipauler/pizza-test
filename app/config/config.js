const config = {
  APP_PORT: 3030,
  LOG_FILE: '../../log/pizza.log',

}

// Environment specific configuration
switch (process.env.NODE_ENV) {

  // Production environment
  case 'production':

    config.LOG_LEVEL = 'info';
    break;

  // Default is configuration for LOCAL development
  default:

    config.LOG_CONSOLE = true;
    config.LOG_LEVEL = 'debug';

    break;
}


module.exports = config;
