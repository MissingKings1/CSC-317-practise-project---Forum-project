var express = require('express');
var router = express.Router();
var db = require('../config/database.js');

//for change password
var bcrypt = require('bcrypt');

//error pinters
const UserError = require('../helpers/error/UserError');
const { successPrint, errorPrint } = require("../helpers/debug/debugprinters");

const { usernameValidator, passwordValidator, passwordConfirmValidator, emailValidator } = require('../middleware/resitratiaon_validator');


/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

//registration
router.post('/registration', usernameValidator, passwordValidator, passwordConfirmValidator, emailValidator, (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;

    /*res.json({
        message: "Invalid user!!!"
    })*/

    /* server valiation*/
    //check username repeat
    db.execute("SELECT * FROM users WHERE username =?", [username])
        .then(([results, fields]) => {
            if (results && results.length == 0) {
                return db.execute("SELECT * FROM users WHERE email=?", [email]);
            } else {
                throw new UserError(
                    "Registration Failed: username already exists",
                    "/registration",
                    200
                );
            }
            //check email repeat
        })
        .then(([results, fields]) => {
            if (results && results.length == 0) {
                //change password to hashed method
                return bcrypt.hash(password, 15);
            } else {
                throw new UserError(
                    "Registration Failed: Email already exists",
                    "/registration",
                    200
                );
            }
        })
        .then((hashedPassword) => {
            //creater user, sent infor to database
            let baseSQL = "INSERT INTO users (username, email, password, createdAt) VALUES (?,?,?, now());";
            return db.execute(baseSQL, [username, email, hashedPassword])
        })
        .then(([results, fields]) => {
            //success
            if (results && results.affectedRows) {
                successPrint("User.js --> User was created!!");
                req.flash('success', 'User account has been made!');
                res.redirect('/login');
            }
            //error by other issue
            else {
                throw new UserError(
                    "Server Error, user could't be created",
                    "/register",
                    500
                );
            }
        }).
    catch((err) => {
        errorPrint("User could not made", err);
        if (err instanceof UserError) {
            errorPrint(err.getMessage());
            req.flash('error', err.getMessage());
            res.status(err.getStatus());
            res.redirect(err.getRedirectURL());
        } else {
            next(err);
        }
    });
});

router.post('/login', (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    let userId;
    let baseSQL = "SELECT id, username, password FROM users WHERE username=?;"
    db.execute(baseSQL, [username])
        .then(([results, fields]) => {
            if (results && results.length == 1) {
                let hashedPassword = results[0].password;
                userId = results[0].id;
                return bcrypt.compare(password, hashedPassword);
            } else {
                throw new UserError("invalid username!", "/login", 200)
            }
        })
        .then((passwordsMatch) => {
            if (passwordsMatch) {
                successPrint(`User ${username} is logged in`);
                req.session.username = username;
                req.session.userId = userId;
                res.locals.logged = true;
                req.flash('success', 'Welcome back,' + username);
                req.session.save(err => {
                    res.redirect('/');
                })
            } else {
                throw new UserError("Incorrect password!", "/login", 200)
            }
        })
        .catch((err) => {
            errorPrint("user login failed");
            if (err instanceof UserError) {
                errorPrint(err.getMessage());
                req.flash('error', err.getMessage());
                res.status(err.getStatus());
                res.redirect('/login');
            } else {
                next(err);
            }
        })
});

router.post('/logout', (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            errorPrint('session could not be destroyed');
            next(err);
        } else {
            successPrint('session was destroyed');
            res.clearCookie('csid');
            res.json({ status: "OK", message: "uers is logged out" });
        }
    });
    setTimeout(() => { location.reload(); }, 500);
});

module.exports = router;