const express = require("express");
const cors = require("cors");
const app = express();
const User = require("./models/user"); //
const userRepository = require("./repositories").userRepository;

require("express-async-errors");

const passport = require("passport");
const session = require("express-session");
const GitHubStrategy = require("passport-github2").Strategy;

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const db = require("./models");
const mgoo = require("mongoose");
const { Error } = require("mongoose");
const { ObjectId } = require("mongodb");

db.mongoose
  .connect(db.url, {})
  .then(() => {
    console.log("Mongoose connected thru MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to database, Reason:", err);
    process.exit();
  });

app
  .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(
    session({
      secret: "ThisisaSecretandshouldBeIntheENVFile",
      resave: false,
      saveUninitialized: true,
    }),
  )
  .use(passport.initialize())
  .use(passport.session())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept",
    );
    res.setHeader(
      "Access-Control.Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE",
    );
    next();
  })
  .use(cors({ methods: ["GET", "POST", "PUT", "DELETE"] }))
  .use(cors({ origin: "*" }))

  .use("/", require("./routes"))
  .use(function handleValidationError(error, req, res, next) {
    if (error instanceof mgoo.Error.ValidationError) {
      return res.status(400).send({
        httpStatus: 400,
        message: error.message,
        errorDetails: {},
      });
    }
    next(error);
  });

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CLIENT_CALLBACKURL,
    },
    async function (accessToken, refreshToken, profile, done) {
      var user = await userRepository.findUserByUserName(profile.username);
      if (!user) {
        const photo = profile.photos[0] ?? {};
        const photoUrl = photo?.value ?? "";
        user = new User({
          username: profile.username,
          photo: photoUrl,
          roles: "user",
        });
        user.save();
      }
      return done(null, profile);
    },
  ),
);
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

app
  .get("/", (req, res) => {
    res.send(
      req.session.user !== undefined
        ? `Logged in as user ${req.session.user.displayName || req.session.user.username}`
        : "Logged Out",
    );
  })
  .get(
    "/github/callback",
    passport.authenticate("github", {
      failureRedirect: "/api-docs",
      session: false,
    }),
    (req, res) => {
      req.session.user = req.user;
      res.redirect("/");
    },
  );

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
