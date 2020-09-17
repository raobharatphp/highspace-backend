var createError = require("http-errors");
var express = require("express");
var cors = require("cors");
var path = require("path");
var bodyParser = require("body-parser");
const keys = require('./config/keys');

var indexRouter = require("./routes/index");
var formRouter = require("./routes/form");
var userRouter = require("./routes/users");
var vendorRouter = require("./routes/vendor");
var mongoose = require("mongoose");

var app = express();
process.env.SECRET_KEY='highspace-auth';

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'pug');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// mongoose connect
mongoose.connect(keys.mongodb.dbURI,{useNewUrlParser:true,useUnifiedTopology:true})
.then(() => {
    console.log("connect to mongodb");
}).catch(err => {
    console.log(err);
});

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));

app.use("/", indexRouter);
app.use("/form", formRouter);
app.use("/users", userRouter);
app.use("/vendor", vendorRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
