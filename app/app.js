const express = require("express");
const bodyParser = require("body-parser");
const logger = require('./logger')();
const config = require('./config/config');

class Application {

  async start() {

    logger.debug(`Starting server: in environment: ${process.env.NODE_ENV}`);

    const app = express();

    app.use(
      bodyParser.json({
        limit: "50mb"
      })
    );

    app.use(require('./routes'));

    app.get("/", async (req, res) => {
      console.log("APP");
      res.status(200).send({ app: "up" });
    });


    this.server = app.listen(config.APP_PORT);
    logger.info(`Server listening on port ${config.APP_PORT}`);
  }

  getServer() {
    return this.server;
  }
  async stop() {
    logger.info('Stopping service');
    await this.server.close();
  }
}

module.exports = Application;
