const express = require("express");
const GitHubStrategy = require("passport-github").Strategy;
const passport = require("passport");
const { User, Photo } = require("../models");
const {
  gitHubCallbackURL,
  gitHubClientID,
  gitHubClientSecret,
} = require("../env/config");
const router = express.Router();

passport.use(
  new GitHubStrategy(
    {
      callbackURL: gitHubCallbackURL,
      clientID: gitHubClientID,
      clientSecret: gitHubClientSecret,
    },
    async function(accessToken, refreshToken, profile, cb) {
      console.log("!!!!! LOGIN ****  Access Token: " + accessToken);

      let user = await User.findOrCreate({
        where: {
          avatarURL: profile.photos[0].value,
          loginStrategy: profile.provider,
          loginStrategyId: profile.id,
          username: profile.username,
        },
        returning: true,
        plain: true,
      }).then((result) => {
        console.log("******** !!!!!!!before result ", result);
        id = result[0].dataValues.id;
        console.log("******** !!!!!!!after result ", id);
        return id;
      });
      cb(null, profile);
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(id, done) {
  done(null, id);
});

router.get("/github", passport.authenticate("github"));
router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function(req, res) {
    res.redirect("/");
  }
);

module.exports = router;
