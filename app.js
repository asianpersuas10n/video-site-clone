require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

// requiring routes
/* kept for reference
const indexRouter = require("./routes/index");*/
const userRouter = require("./Routes/user");
const videoRouter = require("./Routes/videos");

const app = express();

// middleware
app.use(express.json());
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// routes here
/* kept for reference
app.use("/", indexRouter);*/
app.use("/user", userRouter);
app.use("/video", videoRouter);

// catch 404 and forward to error handler
/*app.use(function (req, res, next) {
  next(createError(404));
});*/

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: "error" });
});

// calls for the database
const db = require("./Models");
db.sequelize.sync();

module.exports = app;
