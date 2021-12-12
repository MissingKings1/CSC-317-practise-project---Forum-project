var createError = require("http-errors");
var express = require("express");
var favicon = require('serve-favicon');
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var handlebars = require("express-handlebars");

//Router
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var postsRouter = require("./routes/posts");
var commentRouter = require('./routes/comments');

var app = express();

var userName = "";

//add
const db = require('./config/database');

//sessions
var sessions = require('express-session');
var mysqlSession = require('express-mysql-session')(sessions);

//flashmassage
var flash = require('express-flash');
var errorPrint = require('./helpers/debug/debugprinters').errorPrint;
var requestPrint = require('./helpers/debug/debugprinters').requestPrint;
var successPrint = require('./helpers/debug/debugprinters').successPrint;

app.engine(
    "hbs",
    handlebars({
        layoutsDir: path.join(__dirname, "views/layouts"), //where to look for layouts
        partialsDir: path.join(__dirname, "views/partials"), // where to look for partials
        extname: ".hbs", //expected file extension for handlebars files
        defaultLayout: "layout", //default layout for app, general template for all pages in app
        helpers: {
            emptyObject: (obj) => {
                return !(obj.constructor === Object && Object.keys(obj).length == 0);
            }
        }, //adding new helpers to handlebars for extra functionality
    })
);

//session engine
var mysqlSessionStore = new mysqlSession({ /* using default options*/ }, require("./config/database"));

app.use(sessions({
    key: "csid",
    secret: "this is a secret from csc317 Yongjie He",
    store: mysqlSessionStore,
    resave: false,
    saveUninitialized: false,
}));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use("/public", express.static(path.join(__dirname, "public")));

//session use
app.use((req, res, next) => {
    console.log(req.session);
    if (req.session.username) {
        res.locals.logged = true;
    }
    next();
})

//flash
app.use(flash());


app.use("/", indexRouter); // route middleware from ./routes/index.js
app.use("/users", usersRouter); // route middleware from ./routes/users.js
app.use("/posts", postsRouter); // route middleware from ./routes/post.js
app.use("/comments", commentRouter);


/**
 * Catch all route, if we get to here then the 
 * resource requested could not be found.
 */
app.use((req, res, next) => {
    next(createError(404, `The route ${req.method} : ${req.url} does not exist.`));
})


/**
 * Error Handler, used to render the error html file
 * with relevant error information.
 */
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = err;
    console.log(err);
    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;