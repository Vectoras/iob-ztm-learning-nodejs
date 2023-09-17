// environmental variables
require('dotenv').config();
// importing node modules
const https = require('https');
const fs = require('fs');
const path = require('path');
// importing npm modules
const express = require('express');
const helmet = require('helmet');
const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');
const coockieSession = require('cookie-session');
const { verify } = require('crypto');

// app configuration
const PORT = 3000;
const app = express();

// Auth configuration
const config = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  COOKIE_KEY_1: process.env.COOKIE_KEY_1,
  COOKIE_KEY_2: process.env.COOKIE_KEY_2,
};

const AUTH_OPTIONS = {
  callbackURL: '/auth/google/callback',
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
};

function verifyCallback(accessToken, refreshToken, profile, done) {
  console.log('Google profile', profile);
  console.log('accessToken', accessToken);
  console.log('refreshToken', refreshToken);
  done(null, profile);
}

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));
// Save the session to the cookie
passport.serializeUser((user, done) => {
  done(null, user.id);
});
// Read the session from the cookie
passport.deserializeUser((id, done) => {
  done(null, id);
});

// security middleware
app.use(helmet());
app.use(
  coockieSession({
    name: 'session',
    maxAge: 24 * 60 * 60 * 1000,
    keys: [config.COOKIE_KEY_1, config.COOKIE_KEY_2],
  })
);
app.use(passport.initialize());
// Authenticates the session
app.use(passport.session());

// Auth middleware
function checkLoggedIn(req, res, next) {
  console.log(req.user);

  const isLoggedIn = req.isAuthenticated() && req.user;

  if (!isLoggedIn) {
    return res.status(401).json({
      error: 'You must log in!',
    });
  }

  next();
}

// routing
app.get('/secret', checkLoggedIn, (req, res) => {
  return res.send('Your personal secret value is 42!');
});

app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['email'],
  })
);

app.get('/auth/logout', (req, res) => {
  req.logout(); // proficed by passport -> removes req.user and clears an logged in session
  return res.redirect('/');
});

app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/failure',
    successRedirect: '/',
    session: true,
  }),
  (req, res) => {
    console.log('Google called us back!');
  }
);

app.get('/failure', (req, res) => {
  return res.send('Failed to log in!');
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// starting the server
https
  .createServer(
    {
      key: fs.readFileSync('key.pem'),
      cert: fs.readFileSync('cert.pem'),
    },
    app
  )
  .listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
