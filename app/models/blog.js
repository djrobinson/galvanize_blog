// app/models/blog.js

    // load mongoose since we need it to define a model
    var mongoose = require('mongoose');

    module.exports = mongoose.model('Blog', {
        title: String,
        text : String
    });
    
