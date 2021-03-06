require("dotenv").config();
const express = require("express");
const cors = require("cors");
const es6Renderer = require("express-es6-template-engine");
// named export: v4 but rename it uuidv4
const { v4: uuidv4 } = require("uuid");
const session = require("express-session");
const Sequelize = require('sequelize');
const { User } = require('./models');
const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;

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
// cookie expires after 6min
// secrete is key that allows browser know that I am the server
const sess = {
  secret: "keyboard mouse",
  cookie: { maxAge: 360000 }
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
      callbackURL: "http://localhost:8080/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
      // user profile
      console.log('!!!!! profile github !!! ***', JSON.stringify(profile));

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

passport.serializeUser(function(user, done) {
  //What goes INTO the session here; right now it's everything in User
  done(null, user);
});

passport.deserializeUser(function(id, done) {
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
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

// logs you out then redirect to root index.html list of photos
app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// list photos here
app.get("/photos", ensureAuthenticated, async (req, res) => {
  // app.get("/", async (req, res) => {
  const users = await User.findAll();
  // const photoArray = photoIds.map(id => data[id]);
/**
 * [
  User {
    dataValues: {
      id: 1,
      eventTitle: "Teila's birthday",
      attendee1Name: 'Heggy',
      attendee2Name: 'Avery',
      attendee3Name: 'Dan',
      eventSummary: 'Best birthday party ever!',
      insertLinktoPhoto: 'https://placeimg.com/128/128/nature',
      createdAt: 2021-06-11T01:12:10.511Z,
      updatedAt: 2021-06-11T01:12:10.511Z
    },
  */
  console.log('!!!!!*****db data on users root:', users);
  res.render("photos", {
    locals: {
      title: "??????? FotoFacts",
      users,
      path: req.path
    },
    partials: {
      header: "header"
    }
  });
});



// FotoFacts home page
app.get("/", ensureAuthenticated, async (req, res) => {
  // app.get("/", async (req, res) => {
  const users = await User.findAll();
  // const photoArray = photoIds.map(id => data[id]);
/**
 * [
  User {
    dataValues: {
      id: 1,
      eventTitle: "Teila's birthday",
      attendee1Name: 'Heggy',
      attendee2Name: 'Avery',
      attendee3Name: 'Dan',
      eventSummary: 'Best birthday party ever!',
      insertLinktoPhoto: 'https://placeimg.com/128/128/nature',
      createdAt: 2021-06-11T01:12:10.511Z,
      updatedAt: 2021-06-11T01:12:10.511Z
    },
  */
  console.log('!!!!!*****db data on users root:', users);
  res.render("index", {
    locals: {
      title: "??????? FotoFacts",
      users,
      path: req.path
    },
    partials: {
      header: "header"
    }
  });
});

// Post/upload new photos Create new Photo
app.post("/uploadphoto", ensureAuthenticated, async (req, res) => {
  // app.post("/uploadphoto", async (req, res) => {
    // req.body contains an Object with Name, email, url
  
  const { 
    eventTitle,
    attendee1Name,
    attendee2Name,
    attendee3Name,
    eventSummary,
    insertLinktoPhoto
  } = req.body;

  console.log("req.body ===******>!!!!!!", req.body);
  const newUser = await User.create({
    eventTitle,
    attendee1Name,
    attendee2Name,
    attendee3Name,
    eventSummary,
    insertLinktoPhoto
  });

  // Send back the new user's ID in the response:
  res.json({
    "message": "new photo created success",
    "id": newUser.id,
    "eventTitle": newUser.eventTitle
  });

});

// Delete Photo
app.delete('/photos/:id', async (req, res) => {
  const { id } = req.params;
  const deletedUser = await User.destroy({
    where: {
      id
    }
  });
  res.json({
    "message": "Photo deleted success",
    "deletedUser": deletedUser
  });
});

// UPDATE existing Photo
app.post('/photos/:id', async (req, res) => {
  const { id } = req.params;

  const updatedUser = await User.update(req.body, {
    where: {
      id
    }
  });

  res.json({
    "message": "Update one Photo entry success",
    "updatedUser": updatedUser
  });
  // res.json(updatedUser);
});

// GET all Detail photo info: to retrieve a row by the id
/**
 * {
  dataValues: {
    id: 1,
    eventTitle: "Teila's birthday",
    attendee1Name: 'Heggy',
    attendee2Name: 'Avery',
    attendee3Name: 'Dan',
    eventSummary: 'Best birthday party ever!',
    insertLinktoPhoto: 'https://placeimg.com/128/128/nature',
    createdAt: 2021-06-11T01:12:10.511Z,
    updatedAt: 2021-06-11T01:12:10.511Z
  }
 */
// put route param :id last of uploadphoto order
app.get("/photos/:id", ensureAuthenticated, async (req, res) => {
  // app.get("/uploadphoto/:id", async (req, res) => {
  console.log('!!!!req.params.id', req.params.id);
  // error handling
  try {
    const oneUser = await User.findOne({
      where: {
        id: req.params.id
      }
    });
    console.log('!!!!*******oneUser result', oneUser);

    if (oneUser === null) {
      res.status(404).render("notfound", {
        locals: {
          title: "??????? FotoFacts 404 Error"
        },
        partials: {
          header: "header"
        }
      });
      return
    }

    res.render("detail", {
      locals: {
        oneUser,
        title: "??????? FotoFacts detail"
      },
      partials: {
        header: "header"
      }
    });
  }
  catch (error) {
    console.log(error);
    res.status(404).render("notfound", {
      locals: {
        title: "??????? FotoFacts 404 Error"
      },
      partials: {
        header: "header"
      }
    });
  }
});

app.get("/sessiondata", ensureAuthenticated, (req, res) => {
  console.log(`
    You are on session data page req.session
  `);
  res.send(`
    <h1>Session Data (from the server) req.session:</h1>
    <pre>${JSON.stringify(req.session, null, "\t")}</pre>
  `);
});

// app.get("/kdrama", ensureAuthenticated, (req, res) => {
//   res.send(`<h1>Our super secret best kdrama list:</h1>
//     <ul>
//       <li>Autum in My Heart</li>
//       <li>Full House</li>
//       <li>Stairway to Heaven</li>
//     </ul>
//   `);
// });

app.get("*", ensureAuthenticated, (req, res) => {
  /**
   * catch all route redirect back home
   */
  res.status(404).render("notfound", {
    locals: {
      title: "??????? FotoFacts 404 Error"
    },
    partials: {
      header: "header"
    }
  });
});

app.listen("8080", () => {
  console.log("running on port http://localhost:8080");
});
