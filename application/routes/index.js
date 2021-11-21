var express = require('express');
var router = express.Router();

var isLoggedIn = require('../middleware/routeprotectors').userIsLoggedIn;

/* GET start page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'CSC 317 App', name: "Yongjie He" });
});

//hompage
router.get('/home', function(req, res, next) {
    res.render('home', { username: req.session.username });
});

//subpages
router.get('/login', function(req, res, next) {
    res.render('login');
});

router.get('/registration', function(req, res, next) {
    res.render('registration');
});

router.get('/viewpost', function(req, res, next) {
    res.render('viewpost', { username: req.session.username });
});

//pages require loged in user to access
router.use('/postimage', isLoggedIn);
router.get('/postimage', isLoggedIn, function(req, res, next) {
    res.render('postimage', { username: req.session.username });
});

//logout page
router.get('/logout', function(req, res, next) {
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
    //reflash page
    res.redirect(req.get('referer'));
    res.flash("success", "You is logged out");
});

module.exports = router;