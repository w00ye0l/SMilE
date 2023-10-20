const passport = require('passport');
const local = require('./localStrategy');
const User = require('../models/user');

module.exports = () => {
  passport.serializeUser((req, user, done) => {
    console.log('serializeUserID', user.id);
    console.log('serializeSession', req.session);
    done(null, user.id); 
  });

  passport.deserializeUser((req, id, done) => {
    console.log('deserializeUserID', id);
    console.log('deserializeUser', req.session);
    User.findOne({ where: { id } })
      .then(user => {
        if (!user) {
          console.log('User 없음');
          return done(null, false);
        }
        console.log('User 있음', user);
        done(null, user); 
      })
      .catch(err => {
        console.error('deserializeError:', err);
        done(err);
      });
  });
  
  local();
};