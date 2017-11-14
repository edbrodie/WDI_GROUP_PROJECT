const Member = require('../models/member');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');

function authenticationsRegister(req, res){
  Member
    .create(req.body)
    .then(member => {

      const token = jwt.sign({ userId: member.id }, secret, { expiresIn: '1hr' });
      return res.status(201).json({
        message: `Hi ${member.username}!`,
        token,
        member
      });
    })
    .catch(() => res.status(500).json({ message: 'Something went wrong.' }));
}


function authenticationsLogin(req, res){
  Member
    .findOne({ email: req.body.email })
    .exec()
    .then(member => {
      if (!member || !member.validatePassword(req.body.password)) {
        return res.status(401).json({ message: 'Unauthorized.' });
      }


      const token = jwt.sign({ userId: member.id }, secret, { expiresIn: '1hr' });

      return res.status(200).json({
        message: 'Welcome back.',
        token,
        member
      });

    })
    .catch(() => res.status(500).json({ message: 'Something went wrong on the server' }));
}


module.exports = {
  register: authenticationsRegister,
  login: authenticationsLogin
};
