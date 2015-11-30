var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
    title: String,
    postBody: String,
    upvotes: {type: Number, default: 0},
    author: String,
    posted: {type: Date, default: Date.now()},
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

PostSchema.methods.upvote = function(cb) {
    this.upvotes += 1;
    this.save(cb);
};

mongoose.model('Post', PostSchema);
