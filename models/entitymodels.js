const mongoose = require('mongoose')
const Schema = mongoose.Schema
var bcrypt = require('bcrypt-nodejs')

var PostSchema = new Schema({
    PostTitle: { type: String, required: true },
    Content: { type: String, required: true },
    DatePosted: Date,
    Image: String
})

var Posts = mongoose.model('Post', PostSchema);

var UserSchema = new Schema({
    UserName: { type: String, required: true },
    Password: { type: String, required: true }
})

// UserSchema.methods.verifyPassword = function(password){
//     return bcrypt.compareSync(password, this.password)
//   }

var Users = mongoose.model('User', UserSchema);

var CommentSchema = new Schema({
    Content: { type: String, required: true },
    Date: Date,
    Image: String,
    PostId: String,
    FullName: String,
    Email: String
});

var Comments = mongoose.model('Comment', CommentSchema);

module.exports.PostSchema = Posts;
module.exports.UserSchema = Users;
module.exports.CommentSchema = Comments;
// require('./controller/newpost');