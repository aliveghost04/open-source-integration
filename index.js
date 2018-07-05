const express = require('express');
const app = express();
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/error-handler');
const routes = require('./routes');
const config = require('./config');
const cors = require('cors');
const bodyParser = require('body-parser');

app
  .use(cors(config.cors))
  .use(bodyParser.json())
  .use(auth.parseAuthentication)
  .use(config.app.defaultRoute, routes);

app.disable('x-powered-by');
// app.enable('trust proxy');

errorHandler(app);

app.listen(config.app.port, config.app.host, () => (
  console.log(`Public web services api started listening on ${config.app.host}:${config.app.port} at ${Date()}`)
));
