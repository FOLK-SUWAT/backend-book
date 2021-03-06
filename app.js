createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var usersRouter = require("./routes/users");
var bookRouter = require("./routes/book");
var bodyParser = require('body-parser');
const cors = require('cors');
require("dotenv").config();
var app = express();

const Port = process.env.PORT || 8080;




app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cookieParser())

app.get('/', (req, res) => {
  return res.send('Healthy!')
})

//router api 
app.use("/api/users", usersRouter);
app.use("/api/book", bookRouter);

//app.use(errorHandler)
app.listen(Port, () => console.log(`Example app listening on port ${Port}`))

module.exports = app;


/*var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var usersRouter = require("./routes/users");
var bookRouter = require("./routes/book");

//vertifyToken
var auth = require("./middleware/auth");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  return res.send("Healthy!");
});

app.use("/api/users", usersRouter);

app.use("/api/book", bookRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;*/
