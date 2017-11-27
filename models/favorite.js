var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema( {
    title: String,
    explanation: String,
    isImage: Boolean,
    imageUrl: String,
    credit: String,
    nasaUrl: String,
    owner: String,
    apodDate: Date,
    dateSaved: Date
});


var Favorite = mongoose.model('Favorite', taskSchema);

// change for commit

module.exports = Favorite;