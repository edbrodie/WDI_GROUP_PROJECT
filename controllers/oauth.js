const rp = require('request-promise');
const oauth = require('../config/oauth');
const { secret } = require('../config/environment');
const Member = require('../models/member');
const jwt = require('jsonwebtoken');

function spotifyAuth(req, res, next) {
  spotifyLogin(req, res, next)
    .then(result => res.status(200).json(result))
    .catch(next);
}

function spotifyLogin(req, res, next) {
  var tokenUrl = 'https://accounts.spotify.com/api/token';
  var userUrl = 'https://api.spotify.com/v1/me';

  var params = {
    grant_type: 'authorization_code',
    code: req.body.code,
    redirect_uri: req.body.redirectUri
  };

  var headers = {
    Authorization:
      'Basic ' +
      new Buffer(req.body.clientId + ':' + oauth.SPOTIFY_SECRET).toString(
        'base64'
      )
  };

  console.log('reqbody', req.body);

  return new Promise((resolve, reject) => {
    rp({
      method: 'post',
      uri: tokenUrl,
      json: true,
      form: params,
      headers: headers
    })
      .then(body => {
        req.spotifyToken = body.access_token;

        return rp({
          method: 'GET',
          uri: userUrl,
          json: true,
          headers: {
            Authorization: 'Bearer ' + body.access_token
          }
        });
      })
      .then(profile => {
        req.profile = profile;
        return Member.findOne({ spotify: profile.id }).exec();
      })
      .then(member => {
        // If you have already registered... Then log the person in.
        if (member) {
          const token = jwt.sign({ userId: member.id }, secret, {
            expiresIn: '1hr'
          });

          return resolve({
            message: 'Welcome back.',
            spotifyToken: req.spotifyToken,
            token,
            member
          });
        }

        return Member.findOne({
          email: req.profile.email
        }).exec();
      })
      .then(member => {
        if (!member) {
          // If not, make a user
          member = new Member();
        }

        member.spotify = req.profile.id;
        member.email = req.profile.email;
        // member.picture = profile.images.length > 0 ? profile.images[0].url : '';
        member.username = req.profile.displayName || req.profile.id;

        return member.save();
      })
      .then(member => {
        const token = jwt.sign({ userId: member.id }, secret, {
          expiresIn: '1hr'
        });

        return resolve({
          message: 'Welcome back.',
          spotifyToken: req.spotifyToken,
          token,
          member
        });
      })
      .catch(reject);
  });
}

module.exports = {
  spotify: spotifyAuth
};
