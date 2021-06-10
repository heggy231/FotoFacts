require("dotenv").config();
const express = require("express");
const cors = require("cors");
const es6Renderer = require("express-es6-template-engine");
// named export: v4 but rename it uuidv4
const { v4: uuidv4 } = require("uuid");
const session = require("express-session");
const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;

const data = require("./dataObject");

const app = express();

// ----------------------------------------------------------------------------
//                                Middleware
// ----------------------------------------------------------------------------
app.use(cors());
// __dirname is root of the project, Server will look inside public for static file (https://learn.digitalcrafts.com/flex/lessons/back-end-foundations/express-middleware/#serving-static-files)
// app.use('/', express.static(__dirname + '/public'));
app.use(express.static("public"));
// body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded (converts str => json)

// Configure Template Engine
app.engine("html", es6Renderer);
app.set("views", "templates"); // when looking for views => dir:templates folder
app.set("view engine", "html");

// order matters: session middleware before Passport OAuth
// cookie expires after 60 sec
// secrete is key that allows browser know that I am the server
const sess = {
  secret: "keyboard mouse",
  cookie: { maxAge: 60000 },
};
app.use(session(sess));

// ----------------------------------------------------------------------------
//                                PASSPORT
// ----------------------------------------------------------------------------
// http://www.passportjs.org/packages/passport-github/
// creating a new instance of
//  Remember callbackURL is what I set when signed up for Github OauthApp
// Setting up Passport & passport strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      // user profile
      console.log(JSON.stringify(profile));

      // ASIDE: Access Tokens are super important!! Treat them like pwd (never store in plain text)
      // You can use this to talk to Github API
      console.log("Access Token: " + accessToken);

      // Tell passport job is done. Move on, I got user profile
      // this callback runs when someone logs-in
      // cb(errorMessage = Null No error here, profile=>save the profile info)
      cb(null, profile);
    }
  )
);

// Attach the passport middleware to express
app.use(passport.initialize());
// BEGIN these next lines make it work with the session middleware
app.use(passport.session());

passport.serializeUser(function (user, done) {
  //What goes INTO the session here; right now it's everything in User
  done(null, user);
});

passport.deserializeUser(function (id, done) {
  done(null, id);
  //This is looking up the User in the database using the information from the session "id"
});

app.get("/heartbeat", (req, res) => {
  res.send("I am up");
});

// function to restrict access to routes unless loggedin
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login.html");
}

app.get("/auth/github", passport.authenticate("github"));

// Callback: this must match the name in the GitHubStrategy above AND the one we typed in Github UI
app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

// logs you out then redirect to root index.html list of photos
app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// Post/upload new photos
app.post("/uploadphoto", ensureAuthenticated, (req, res) => {
  console.log("req.body ===******>!!!!!!", req.body);

  // Create ID
  const id = uuidv4();

  // Save data to server "db"
  req.body.id = id;
  req.body.images = [];
  data[id] = req.body;

  res.status(200).send();
});

app.get("/", ensureAuthenticated, (req, res) => {
  const photoIds = Object.keys(data);
  const photoArray = photoIds.map((id) => data[id]);

  res.render("index", {
    locals: {
      title: "🎞️ FotoFacts",
      photoArray,
    },
    partials: {
      header: "header",
    },
  });
});

app.get("*", ensureAuthenticated, (req, res) => {
  /**
   * catch all route redirect back home
   */
  res.status(404).render("notfound", {
    locals: {
      title: "🎞️ FotoFacts 404 Error",
    },
    partials: {
      header: "header",
    },
  });
});

app.listen("8080", () => {
  console.log("running on port http://localhost:8080");
});
