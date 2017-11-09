const express         = require('express');
const morgan          = require('morgan');
const bodyParser      = require('body-parser');
const router          = require('./config/routes');
const { db, port }    = require('./config/enviroment');
const customResponses = require('./lib/customResponses');
const errorHandler    = require('./lib/errorHandler');

const app             = express();
const enviroment      = app.get('env');

const mongoose        = require('mongoose');
mongoose.Promise      = require('bluebird');
mongoose.connect(db[enviroment], { useMongoClient: true });

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

app.use(customResponses);
app.use('/api', router);
app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.use(errorHandler);

app.listen(port, () => console.log(`Express is up and running on port: ${port}`));

module.exports = app;
