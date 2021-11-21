const checkUsername = (username) => {
    /**
     * Regex explanation
     * ^    --> start of the string
     * \D   --> anything not a digit [^0-9]
     * \w   --> anything that is a alphanumeric character[a=zA-Z0-9]
     * {2,} --> 2 or more charcaters with No UPPER LIMIT
     */
    let usernameChecker = /^\D\w{2,}$/;
    return usernameChecker.test(username);
}

const checkPassword = (password) => {
    let passwordChecker = /^(?=(.*[A-Z]){1,})(?=(.*[0-9]){2,})(?=(.*[- + ! @ # $ ^ & *]){1,}).{8,}$/;
    return passwordChecker.test(password);
}

const checkEmail = (email) => {
    let emailChecker = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailChecker.test(email);
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

module.exports = { usernameValidator, passwordValidator, passwordConfirmValidator, emailValidator }