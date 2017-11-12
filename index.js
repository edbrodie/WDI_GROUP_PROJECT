const express                 = require('express');
const morgan                  = require('morgan');
const bodyParser              = require('body-parser');
const router                  = require('./config/routes');
const { db, port, secret }    = require('./config/environment');
const expressJWT              = require('express-jwt');
const customResponses         = require('./lib/customResponses');
const errorHandler            = require('./lib/errorHandler');
const app                     = express();
const enviroment              = app.get('env');
const mongoose                = require('mongoose');
mongoose.Promise              = require('bluebird');
mongoose.connect(db[enviroment], { useMongoClient: true });

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
<<<<<<< HEAD


=======
>>>>>>> 78be1af2480b96262a9c4662f5e3ddd361743e12
app.use(express.static(`${__dirname}/public`));

app.use('/api', expressJWT({ secret: secret })
  .unless({
    path: [
      { url: '/api/register', methods: ['POST'] },
      { url: '/api/login',    methods: ['POST'] }
    ]
  }));

app.use(jwtErrorHandler);

function jwtErrorHandler(err, req, res, next){
  if (err.name !== 'UnauthorizedError') return next();
  return res.status(401).json({ message: 'You must be logged in to view this content' });
}

app.use(customResponses);
app.use('/api', router);
app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.use(errorHandler);

app.listen(port, () => console.log(`Express is up and running on port: ${port}`));

module.exports = app;
