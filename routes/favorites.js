var express = require('express');
var router = express.Router;

/* Get Fave Page */
router.get('/', function (req, res, next){
    res.render('favorites', { favorites: req.session.favorites });
});

router.post('/add', function (req, res, next){
   if (!req.session.favorites) {
       req.session.favorites = [];
   }

   // Is this Image already a fave
    var isFave = false;
   for (var i = 0; i < req.session.favorites.length; i++) {
       if (req.session.favorites[i].date == req.body.date) {
           isFave = true;
       }
   }

   if (!isFave) {
       req.session.favorites.push(req.body)
   }

   res.redirect('/favorites');

});

module.exports = router;