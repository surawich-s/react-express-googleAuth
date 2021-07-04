require("dotenv").config();
require("./auth");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const userRoutes = require("./routes/users");
const postRoutes = require("./routes/posts");
const MongoDBSession = require("connect-mongodb-session")(session);
const User = require("./models/user");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is connected"))
  .catch((error) => console.log(error.message));

mongoose.set("useFindAndModify", false);

const store = new MongoDBSession({
  uri: process.env.CONNECTION_URL,
  collections: "mySessions",
});

const sessionMiddleware = session({
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: false,
  store: store,
});

app.use(sessionMiddleware);

app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/google/success",
    failureRedirect: "/auth/google/failure",
  })
);

app.get("/logout", async (req, res) => {
  req.logout();
  await req.session.destroy();
  res.status(200).json({
    message: "Logged out successfully",
  });
});

app.get("/auth/google/success", (req, res) => {
  res.send(req.user);
  // res.status(200).json(req.user);
});

app.get("/auth/google/failure", (req, res) => {
  res.status(401).json({
    message: "Unauthorized",
  });
});

app.use("/api/v1/", isLoggedIn, userRoutes);
app.use("/api/v1/posts", isLoggedIn, postRoutes);

app.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
});
