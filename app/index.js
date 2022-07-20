const Application = require('./app')

module.exports = async () => {

  try {

    const app = new Application();
    app.start();

    // Add process listeners to shutdown app
    const stop = async () => {
      try {
        await app.stop();
        console.log('\nApplication stopped');
        console.log("New");
      } catch (error) {
        console.log(error);
      }
    }

    process.on('SIGINT', stop);
    process.on('SIGUSR1', stop);
    process.on('SIGUSR2', stop);

    process.on('uncaughtException', (e) => {
      console.log('Uncaught Exception...');
      console.log(e.stack);
    })

  } catch (error) {
    console.log(error);
    process.exit(1);
  }

}
