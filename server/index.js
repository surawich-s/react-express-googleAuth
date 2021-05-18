require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const User = require("./models/user");
const userRoutes = require("./routes/users");
const postRoutes = require("./routes/posts");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(
  session({
    secret: "Shh, its a secret!",
    resave: false,
    saveUninitialized: true,
  })
);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log("Server running on port: " + PORT);
    })
  )
  .catch((error) => console.log(error.message));

mongoose.set("useFindAndModify", false);

app.use(async (req, res, next) => {
  const user = await User.findOne({ id: req.session.userId });
  req.user = user;
  next();
});

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/posts", postRoutes);
