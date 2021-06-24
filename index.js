require("dotenv").config();
const express = require("express");
const cors = require("cors");
const es6Renderer = require("express-es6-template-engine");
// named export: v4 but rename it uuidv4
const { v4: uuidv4 } = require("uuid");
const session = require("express-session");
const Sequelize = require("sequelize");
const { User, Photo } = require("./models");
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
// cookie expires after 10 min
// secrete is key that allows browser know that I am the server
const sess = {
  secret: "keyboard mouse",
  cookie: { maxAge: 600000 },
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
      // callbackURL: "http://localhost:8080/auth/github/callback"
      callbackURL: process.env.GITHUB_CLIENT_CALLBACKURL,
    },
    async function(accessToken, refreshToken, profile, cb) {
      // user profile
      // console.log('!!!!! LOGIN **** profile github !!! ***', JSON.stringify(profile));
      // console.log('!!!!! LOGIN **** profile github !!! ***');

      // ASIDE: Access Tokens are super important!! Treat them like pwd (never store in plain text)
      // You can use this to talk to Github API
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
        // console.log("******** !!!!!!!req.session.passport.user BEFORE ", req.session.passport.user);
        // req.session.passport.user = {
        //   id
        // }
        // console.log("******** !!!!!!!req.session.passport.user AFTER ", req.session.passport.user);
      });
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

// FotoFacts home page
app.get("/", ensureAuthenticated, async (req, res) => {
  const user = req.session.passport.user;
  const greetUser = req.session.passport.user.displayName;
  // console.log('~~~~!!!!!***** req.session.passport.user ~~~~!!!!!*****', user);
  // console.log('~~~~!!!!!***** req.session.passport.user.displayName ~~~~!!!!!*****', greetUser);

  // res.send(user);
  res.render("index", {
    locals: {
      user,
      title: "🎞️ FotoFacts",
      path: req.path,
    },
    partials: {
      header: "header",
    },
  });
});

// logs you out then redirect to root index.html list of photos
app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// list Users here
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
              avatarURL: 'https://placeimg.com/128/128/any',
              createdAt: 2021-06-18T02:27:57.777Z,
              updatedAt: 2021-06-18T02:27:57.777Z
         }, {}, {} ]
 */
  // console.log('!!!!!*****db usersArray original form:', usersArray);

  res.render("users", {
    locals: {
      title: "🎞️ Users Page",
      usersArray,
      path: req.path,
    },
    partials: {
      header: "header",
    },
  });
});

// Create new user
app.post("/users", async (req, res) => {
  // req.body contains an Object with firstName, lastName, email
  const { firstName, lastName, email, avatarURL, username } = req.body;
  const newUser = await User.create({
    firstName,
    lastName,
    email,
    avatarURL,
    username,
  });

  // Send back the new user's ID in the response:
  res.json({
    id: newUser.id,
  });
});

// get all users and all photos belongs to users
//  usersArray= 1st layer: array with obj, 2nd layer: array with obj => map() then inner map()
// usersArray = [
//   {   id:, firstName,
//       Photos: [
//         { url: "img" }, { url: "img2" }
//       ]
//   }
// ];
app.get("/users/photos", ensureAuthenticated, async (req, res) => {
  const usersArray = await User.findAll({
    include: [
      {
        model: Photo,
      },
    ],
  });
  // console.log('!!!!!*****db usersArray original form:', usersArray);
  res.render("usersWithPhotos", {
    locals: {
      usersArray,
      title: "Users with Photos",
    },
    partials: {
      header: "header",
    },
  });
  // res.send(usersArray);
});

// Post/upload new photos Create new Photo ensureAuthenticated
app.post("/uploadphoto", ensureAuthenticated, async (req, res) => {
  // req.body contains an Object with Name, email, url
  const {
    title,
    category,
    attendee1FirstName,
    attendee1LastName,
    attendee2FirstName,
    attendee2LastName,
    attendee3FirstName,
    attendee3LastName,
    description,
    url,
    userId,
  } = req.body;

  // console.log("req.body ===******>!!!!!!", req.body);
  const newPhoto = await Photo.create({
    title,
    category,
    attendee1FirstName,
    attendee1LastName,
    attendee2FirstName,
    attendee2LastName,
    attendee3FirstName,
    attendee3LastName,
    description,
    url,
    userId,
  });

  // Send back the new user's ID in the response:
  res.json({
    message: "new photo created success",
    id: newPhoto.id,
    eventTitle: newPhoto.title,
  });
});

// Delete User
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  const deletedUser = await User.destroy({
    where: {
      id,
    },
  });

  // console.log('!!!!! ******* deletedUser', deletedUser); // => if no user found -> 0

  if (deletedUser === 0) {
    // if no user id is found
    res.status(404).render("notfound", {
      locals: {
        title: "🎞️ FotoFacts 404 Error",
      },
      partials: {
        header: "header",
      },
    });
    return;
  }

  res.json({
    message: "User deleted success",
    deletedUser: deletedUser,
  });
});

// UPDATE existing Photo
app.post("/users/:id", async (req, res) => {
  const { id } = req.params;
  const updatedUser = await User.update(req.body, {
    where: {
      id,
    },
  });

  // console.log('!!!!! ******* User to update', updatedUser); // => if no user found -> [0]

  if (updatedUser[0] === 0) {
    // if no user id is found
    res.status(404).render("notfound", {
      locals: {
        title: "🎞️ FotoFacts 404 Error",
      },
      partials: {
        header: "header",
      },
    });
    return;
  }

  res.json({
    message: "Update one user entry success",
    updatedUser: updatedUser,
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
      avatarURL: 'https://placeimg.com/128/128/arch/sepia',
      createdAt: 2021-06-18T07:31:16.270Z,
      updatedAt: 2021-06-18T07:31:16.270Z
    }
 */
// ORDER MATTERS!!! *** put this route param :id very last on index.js among /users/ routes
app.get("/users/:id", ensureAuthenticated, async (req, res) => {
  // console.log('!!!!*******req.params.id', req.params.id);
  // error handling
  try {
    // const oneUser = await User.findOne({
    //   where: {
    //     id: req.params.id
    //   }
    // });
    const oneUser = await User.findByPk(req.params.id);
    // console.log('!!!!*******oneUser result', oneUser);

    if (oneUser === null) {
      res.status(404).render("notfound", {
        locals: {
          title: "🎞️ FotoFacts 404 Error",
        },
        partials: {
          header: "header",
        },
      });
      return;
    }

    res.render("detailUser", {
      locals: {
        oneUser,
        title: "🎞️ User Detail",
      },
      partials: {
        header: "header",
      },
    });
  } catch (error) {
    // console.log(error);
    res.status(404).render("notfound", {
      locals: {
        title: "🎞️ FotoFacts 404 Error",
      },
      partials: {
        header: "header",
      },
    });
  }
});

app.get("/sessiondata", ensureAuthenticated, (req, res) => {
  // console.log(`You are on session data page req.session`);
  res.send(`
    <h1>Session Data (from the server) req.session:</h1>
    <pre>${JSON.stringify(req.session, null, "\t")}</pre>
  `);
});

app.get("*", (req, res) => {
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

app.listen(process.env.PORT, () => {
  console.log(`running on port http://localhost:${process.env.PORT}`);
});
