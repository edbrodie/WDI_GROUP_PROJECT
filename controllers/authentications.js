const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');

function authenticationsRegister(req, res){
  User
    .create(req.body)
    .then(User => {

      const token = jwt.sign({ userId: User.id }, secret, { expiresIn: '1hr' });
      return res.status(201).json({
        message: `Hi ${User.username}!`,
        token,
        User
      });
    })
    .catch(() => res.status(500).json({ message: 'Something went wrong.' }));
}


function authenticationsLogin(req, res){
  User
    .findOne({ email: req.body.email })
    .exec()
    .then(User => {
      if (!User || !User.validatePassword(req.body.password)) {
        return res.status(401).json({ message: 'Unauthorized.' });
      }


      const token = jwt.sign({ userId: User.id }, secret, { expiresIn: '1hr' });

      return res.status(200).json({
        message: 'Welcome back.',
        token,
        User
      });

    })
    .catch(() => res.status(500).json({ message: 'Something went wrong on the server' }));
}


module.exports = {
  register: authenticationsRegister,
  login: authenticationsLogin
};
