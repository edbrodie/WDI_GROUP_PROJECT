
const rp = require('request-promise');
const oauth = require('../config/oauth');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
// const { secret } = require('../config/environment');




// SPOTIFY_SECRET
// app.post('/auth/spotify',




function spotifyAuth(req, res) {
  var tokenUrl = 'https://accounts.spotify.com/api/token';
  var userUrl = 'https://api.spotify.com/v1/me';

  var params = {
    grant_type: 'authorization_code',
    code: req.body.code,
    redirect_uri: req.body.redirectUri
  };

  var headers = {
    Authorization: 'Basic ' + new Buffer(req.body.clientId + ':' + config.SPOTIFY_SECRET).toString('base64')
  };

  request.post(tokenUrl, { json: true, form: params, headers: headers }, function(err, response, body) {
    if (body.error) {
      return res.status(400).send({ message: body.error_description });
    }

    request.get(userUrl, {json: true, headers: {Authorization: 'Bearer ' + body.access_token} }, function(err, response, profile){
      // Step 3a. Link user accounts.
      if (req.header('Authorization')) {
        User.findOne({ spotify: profile.id }, function(err, existingUser) {
          if (existingUser) {
            return res.status(409).send({ message: 'There is already a Spotify account that belongs to you' });
          }
          var token = req.header('Authorization').split(' ')[1];
          var payload = jwt.decode(token, config.TOKEN_SECRET);
          User.findById(payload.sub, function(err, user) {
            if (!user) {
              return res.status(400).send({ message: 'User not found' });
            }
            user.spotify = profile.id;
            user.email = user.email || profile.email;
            user.picture = profile.images.length > 0 ? profile.images[0].url : '';
            user.displayName = user.displayName || profile.displayName || profile.id;

            user.save(function() {
              var token = createJWT(user);
              res.send({ token: token });
            });
          });
        });
      } else {
        // Step 3b. Create a new user account or return an existing one.
        User.findOne({ spotify: profile.id }, function(err, existingUser) {
          if (existingUser) {
            return res.send({ token: createJWT(existingUser) });
          }
          var user = new User();
          user.spotify = profile.id;
          user.email = profile.email;
          user.picture = profile.images.length > 0 ? profile.images[0].url : '';
          user.displayName = profile.displayName || profile.id;

          user.save(function(err) {
            var token = createJWT(user);
            res.send({ token: token });
          });
        });
      }
    });
  });

  function createJWT(user) {
    var payload = {
      sub: user._id,
      iat: moment().unix(),
      exp: moment().add(14, 'days').unix()
    };
    return jwt.encode(payload, config.TOKEN_SECRET);
  }
}


module.exports = {
  spotifyAuth: spotifyAuth
};
