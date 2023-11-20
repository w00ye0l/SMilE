const passport = require("passport");
const local = require("./localStrategy");
const User = require("../models/user");

module.exports = () => {
  passport.serializeUser((req, user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((req, id, done) => {
    User.findOne({ where: { id } })
      .then((user) => {
        if (!user) {
          console.log("User 없음");
          return done(null, false);
        }
        done(null, user);
      })
      .catch((err) => {
        console.error("deserializeError:", err);
        done(err);
      });
  });
  local();
};
