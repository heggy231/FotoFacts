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
app.get("/users", ensureAuthenticated, async (req, res) => {
  const usersArray = await User.findAll();
/**
 * users = [
    User {
            dataValues: {
              id: 1,
              firstName: 'Teila',
              lastName: 'Kim',
              email: 'tk@nasa.gov',
              avatar: 'https://placeimg.com/128/128/any',
              createdAt: 2021-06-18T02:27:57.777Z,
              updatedAt: 2021-06-18T02:27:57.777Z
         }, {}, {} ]
 */
  console.log('!!!!!*****db usersArray original form:', usersArray);

  res.render("users", {
    locals: {
      title: "🎞️ Users Page",
      usersArray,
      path: req.path
    },
    partials: {
      header: "header"
    }
  });
});

// FotoFacts home page
app.get("/", ensureAuthenticated, async (req, res) => {
  res.render("index", {
    locals: {
      title: "🎞️ FotoFacts",
      path: req.path
    },
    partials: {
      header: "header"
    }
  });
});

// Create new user
app.post('/users', async (req, res) => {
  // req.body contains an Object with firstName, lastName, email
  const { firstName, lastName, email, avatar } = req.body;
  const newUser = await User.create({
      firstName,
      lastName,
      email,
      avatar
  });
  
  // Send back the new user's ID in the response:
  res.json({
      id: newUser.id
  });
});

// Post/upload new photos Create new Photo
// app.post("/uploadphoto", ensureAuthenticated, async (req, res) => {
//   // app.post("/uploadphoto", async (req, res) => {
//     // req.body contains an Object with Name, email, url
  
//   const { 
//     eventTitle,
//     attendee1Name,
//     attendee2Name,
//     attendee3Name,
//     eventSummary,
//     insertLinktoPhoto
//   } = req.body;

//   console.log("req.body ===******>!!!!!!", req.body);
//   const newUser = await User.create({
//     eventTitle,
//     attendee1Name,
//     attendee2Name,
//     attendee3Name,
//     eventSummary,
//     insertLinktoPhoto
//   });

//   // Send back the new user's ID in the response:
//   res.json({
//     "message": "new photo created success",
//     "id": newUser.id,
//     "eventTitle": newUser.eventTitle
//   });
// });

// Delete Photo
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  const deletedUser = await User.destroy({
    where: {
      id
    }
  });

  console.log('!!!!! ******* deletedUser', deletedUser); // => if no user found -> 0

  if (deletedUser === 0) {
    // if no user id is found
    res.status(404).render("notfound", {
      locals: {
        title: "🎞️ FotoFacts 404 Error"
      },
      partials: {
        header: "header"
      }
    });
    return
  }

  res.json({
    "message": "User deleted success",
    "deletedUser": deletedUser
  });
});

// UPDATE existing Photo
app.post('/users/:id', async (req, res) => {
  const { id } = req.params;
  const updatedUser = await User.update(req.body, {
    where: {
      id
    }
  });

  console.log('!!!!! ******* User to update', updatedUser); // => if no user found -> [0]

  if (updatedUser[0] === 0) {
    // if no user id is found
    res.status(404).render("notfound", {
      locals: {
        title: "🎞️ FotoFacts 404 Error"
      },
      partials: {
        header: "header"
      }
    });
    return
  }

  res.json({
    "message": "Update one user entry success",
    "updatedUser": updatedUser
  });
});

// GET all Detail photo info: to retrieve a row by the id
/**
 * User {
    dataValues: {
      id: 5,
      firstName: 'Korean',
      lastName: 'Power',
      email: 'kp@naver.kr',
      avatar: 'https://placeimg.com/128/128/arch/sepia',
      createdAt: 2021-06-18T07:31:16.270Z,
      updatedAt: 2021-06-18T07:31:16.270Z
    }
 */
// ORDER MATTERS!!! *** put this route param :id very last on index.js among /users/ routes
app.get("/users/:id", ensureAuthenticated, async (req, res) => {
  console.log('!!!!*******req.params.id', req.params.id);
  // error handling
  try {
    // const oneUser = await User.findOne({
    //   where: {
    //     id: req.params.id
    //   }
    // });
    const oneUser = await User.findByPk(req.params.id);
    console.log('!!!!*******oneUser result', oneUser);

    if (oneUser === null) {
      res.status(404).render("notfound", {
        locals: {
          title: "🎞️ FotoFacts 404 Error"
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
        title: "🎞️ User Detail"
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
        title: "🎞️ FotoFacts 404 Error"
      },
      partials: {
        header: "header"
      }
    });
  }
});

// app.get("/sessiondata", ensureAuthenticated, (req, res) => {
//   console.log(`
//     You are on session data page req.session
//   `);
//   res.send(`
//     <h1>Session Data (from the server) req.session:</h1>
//     <pre>${JSON.stringify(req.session, null, "\t")}</pre>
//   `);
// });


app.get("*", (req, res) => {
  /**
   * catch all route redirect back home
   */
  res.status(404).render("notfound", {
    locals: {
      title: "🎞️ FotoFacts 404 Error"
    },
    partials: {
      header: "header"
    }
  });
});

app.listen("8080", () => {
  console.log("running on port http://localhost:8080");
});
