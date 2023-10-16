const passport = require('passport');
const local = require('./localStrategy');
const User = require('../models/user');

module.exports = () => {
  passport.serializeUser((user, done) => {
    console.log('serializeUser.id', user.id);
    done(null, user.id); 
  });

  passport.deserializeUser((req, id, done) => {
    console.log('deserializerUser', req.session);
    User.findOne({ where: { id } })
      .then(user => done(null, user))
      .catch(err => done(err));
  });
  local();
};