var express = require('express');
var router = express.Router();

var isLoggedIn = require('../middleware/routeprotectors').userIsLoggedIn;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'CSC 317 App', name: "Yongjie He" });
});

router.get('/login', function(req, res, next) {
    res.render('login');
});

router.get('/registration', function(req, res, next) {
    res.render('registration');
});

//require loged in user to access
router.use('/postimage', isLoggedIn);
router.get('/postimage', isLoggedIn, function(req, res, next) {
    res.render('postimage');
});

router.use('/postimage', isLoggedIn);
router.get('/viewpost', isLoggedIn, function(req, res, next) {
    res.render('viewpost');
});

//hompage
router.get('/home', function(req, res, next) {
    res.render('home');
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