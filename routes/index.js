var express = require('express');
var apod = require('../apod/apodService');
var passport = require('passport');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.redirect('/today');
});

router.get('/today', function (req, res, next) {

    console.log("user: ");
    console.log( req.user );

    apod(function (err, apod_data) {
        if (err) {
            return res.render('apod_error', {error: err.message, title: "Error"})
        } else {
            return res.render('index', { apod: apod_data, title: "APOD for " + apod_data.date, user: req.user })
        }
    }, false);
});

router.get('/random' , function (req, res, next) {
    apod(function (err, apod_data) {
        if (err) {
            return res.render('apod_error', {error: err.message, title: "Error"})
        } else {
            return res.render('index', { apod: apod_data, title: "APOD for " + apod_data.date, user: req.user })
        }
    }, true);
});

router.get('/fetch_date' , function (req, res, next) {
    apod(function (err, apod_data) {
        if (err) {
            return res.render('apod_error', {error: err.message, title: "Error"})
        } else {
            return res.render('index', { apod: apod_data, title: "APOD for " + apod_data.date, user: req.user })
        }
    }, true);
});


//
// /* Middle ware to determine logged in*/
// function isLoggedIn(req, res, next) {
//     if (req.isAuthenticated()) {
//         next();
//     } else {
//         res.redirect('/')
//     }
// }

// router.get('/fetch_picture', function (req, res, next) {
//
//     console.log('RANDOM?' + req.query.random);
//
//     apod(function (err, apod_data) {
//         if (err) {
//             return res.render('apod_error', {error: err.message, title: "Error"})
//         } else {
//             return res.render('index', { apod: apod_data, title: "APOD for " + apod_data.date, user: true })
//         }
//     }, req.query.random);
// });
//



module.exports = router;
