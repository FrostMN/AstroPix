var express = require('express');
var router = express.Router();
var passport = require('passport');
var Favorite = require('../models/favorite');


/* GET favorites page */
router.get('/', function(req, res, next){
    if (req.user) {
        var user_id = req.user._id;

        console.log("in completed");
        console.log(user_id);

        Favorite.find( { owner: user_id } )
            .then( (docs) => {
                res.render('favorites', { favorites: docs, user: req.user, owner: user_id });
            }).catch( (err) => {
            next(err);
        });
    } else {
        res.redirect('/');
    }
});


router.post('/add', function(req, res, next) {

    if (req.user) {
        console.log("user logged in");
        var user_id = req.user._id;
        var d = new Date();

        var faveData = {
            title: req.body.title,
            explanation: req.body.explanation,
            isImage: req.body.isImage,
            imageUrl: req.body.url,
            nasaUrl: req.body.nasa_url,
            credit: req.body.credit,
            owner: user_id,
            apodDate: req.body.date,
            dateSaved: d
        };

        new Favorite(faveData).save()
            .then( (newTask) => {
                console.log('new favorite added is', newTask);
                res.redirect('/');
            })
            .catch( (err) => {
                    next(err);
                }
            );
    }
});

router.post('/delete', function (req, res, next) {

    console.log('in delete');
    console.log(req.body);


    var deleteData = {
        owner: req.body.owner_id,
        _id: req.body.favorite_id
    };


    console.log(deleteData);

    Favorite.deleteOne( deleteData )
        .then( (result) =>{
            if (result.deletedCount === 1) {
                req.flash('info', 'Fave Deleted');
                res.redirect('/favorites');
            } else {
                res.status(404).send("Error deleting Favorates: not found");
            }
        })
        .catch((err) => {
                next(err);
            }
        );
});

module.exports = router;