var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});


/* POST to login page. */
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/',
    failureFlash: true
}));

/* POST to signup page. */
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/',
    failureFlash: true
}));

// route to logout
router.get('/logout', function (req, res, next) {
    req.logout();
    res.redirect('/');
});
module.exports = router;
