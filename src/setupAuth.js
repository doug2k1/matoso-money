const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require('./config');

const setup = app => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    done(null, { id });
  });

  // setup Google strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
        clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
        callbackURL: `${config.siteURL}/auth/google/callback`
      },
      async (accessToken, refreshToken, profile, done) => {
        if (profile.id === process.env.GOOGLE_OAUTH_ALLOWED_USER_ID) {
          return done(null, { id: profile.id });
        }

        return done();
      }
    )
  );

  app.use(passport.initialize());
  app.use(passport.session());

  // endpoints
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile']
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/');
    }
  );

  app.get('/auth/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
};

module.exports = setup;
