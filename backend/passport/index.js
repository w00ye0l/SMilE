const passport = require('passport');
const local = require('./localStrategy');
const User = require('../models/user');

module.exports = () => {
  passport.serializeUser((req, user, done) => {
    console.log('serializeUser.id', user.id);
    console.log('serializeSession', req.session);
    done(null, user.id); 
  });

  passport.deserializeUser((req, id, done) => {
    console.log('deserializeUser', req.session);
    User.findOne({ where: { id } })
      .then(user => {
        if (!user) {
          return done(null, false);
        }
        done(null, user); 
      })
      .catch(err => done(err));
  });
  
  local();
};