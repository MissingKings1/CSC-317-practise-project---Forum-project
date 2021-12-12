var reg_username = /^[a-zA-Z]\w{2,12}$/; // not sure use 2 or 3
var reg_password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[*\d])(?=.*[$@$!%*#?&])[^]{8,20}$/; // not sure use 8 or 7

//username validator
const checkUsername = (username) => {
    return username.match(reg_username);
}
const usernameValidator = (req, res, next) => {
    let username = req.body.username;
    if (!checkUsername(username)) {
        req.flash('error', "invalid username!!!");
        req.session.save(err => {
            res.redirect('/registration');
        });
    } else {
        next();
    }
}

//Validator password
const checkPassword = (password) => {
    return password.match(reg_password);
}

const passwordValidator = (req, res, next) => {
    let password = req.body.password;
    if (!checkPassword(password)) {
        req.flash('error', "invalid password!!!");
        req.session.save(err => {
            res.redirect('/registration');
        });
    } else {
        next();
    }
}

const passwordConfirmValidator = (req, res, next) => {
    let passWord = req.body.passWord;
    let password = req.body.password;
    if (passWord != password) {
        req.flash('error', "Two password different!!!");
        req.session.save(err => {
            res.redirect('/registration');
        });
    } else {
        next();
    }
}

//email validator
const checkEmail = (email) => {
    let emailChecker = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailChecker.test(email);
}

const emailValidator = (req, res, next) => {
    let email = req.body.email;
    if (!checkEmail(email)) {
        req.flash('error', "invalid email!!!");
        req.session.save(err => {
            res.redirect('/registration');
        });
    } else {
        next();
    }
}

//module
module.exports = { usernameValidator, passwordValidator, passwordConfirmValidator, emailValidator }