require('dotenv').config();
const express = require('express');
const cors = require('cors');
const es6Renderer = require('express-es6-template-engine');
// named export: v4 but rename it uuidv4
const { v4: uuidv4 } = require('uuid');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;

const app = express();

// ----------------------------------------------------------------------------
//                                Middleware                           
// ----------------------------------------------------------------------------
app.use(cors());
app.use(express.static('public'));
// body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded (converts str => json)

// Configure Template Engine
app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

// order matters: session middleware before Passport OAuth
// cookie expires after 60 sec
// secrete is key that allows browser know that I am the server
const sess = {
  secret: 'keyboard mouse',
  cookie: { maxAge: 60000 }
};
app.use(session(sess));

// ----------------------------------------------------------------------------
//                                PASSPORT                           
// ----------------------------------------------------------------------------
// http://www.passportjs.org/packages/passport-github/
// creating a new instance of 
//  Remember callbackURL is what I set when signed up for Github OauthApp
// Setting up Passport & passport strategy
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:8080/auth/github/callback"
},
function(accessToken, refreshToken, profile, cb) {
  // user profile
  console.log(JSON.stringify(profile))

  // ASIDE: Access Tokens are super important!! Treat them like pwd (never store in plain text)
  // You can use this to talk to Github API
  console.log("Access Token: " + accessToken)

  // Tell passport job is done. Move on, I got user profile
  // this callback runs when someone logs-in
  // cb(errorMessage = Null No error here, profile=>save the profile info)
  cb(null, profile)
}
));


app.get('/heartbeat', (req, res) => {
  res.send('I am up');
});

app.get('*', (req, res) => {
  /**
   * catch all route redirect back home
   */
  res.status(404).redirect('/');
});

app.listen('8080', () => {
  console.log("running on port http://localhost:8080");
});