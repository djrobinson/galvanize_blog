
    var mongoose = require('mongoose');
    
    
    module.exports = mongoose.model('Vocab', {
    		word: String,
    		definition: String
    });
