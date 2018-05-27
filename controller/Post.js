const index = require('../app');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
var model = require('../models/entitymodels');
var multer = require('multer');
var app = index.myApp;
var fs = require('file-system');
var rootPath = index.myPath;
var upload = multer({ dest: 'client/uploads/' })
var uploadMethod = require('../repositories/upload');

var currentDate = new Date();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.post('/newpost', upload.single('Image'), (req, res) => {
    var ImageFile = '';
    if (req.file) {
        uploadMethod.uploadFile.myUpload(req);
        ImageFile = req.file.filename;
    }
    //Create New Blog Post
    model.PostSchema.create({
        PostTitle: req.body.PostTitle,
        Content: req.body.Content,
        Image: ImageFile,
        DatePosted: currentDate
    }, function (err, data) {
        // console.log(data.id);
        res.redirect('post-details/' + data._id);
    });
});

//View all Posts
app.get('/getblogpost', (req, res) => {
    model.PostSchema.find(function (err, post) {
        if (err) console.log(err);
        // console.log(post);
        res.json(post);
    })
});

app.get('/mypostdetails/:id', (req, res) => {
    // console.log(req.params.id);
    model.PostSchema.findById(req.params.id, (err, data) => {
        if (err) console.log(err);
        // console.log(data);
        res.json(data);
    });
});

app.post('/deletepost', (req, res) => {
    model.PostSchema.findByIdAndRemove(req.body.PostId, (err, data) => {
        if (err) console.log(err);
        // console.log(data);
        res.json(true);
    });
});

app.get('/editpost/:id', (req, res) => {
    model.PostSchema.findByIdAndUpdate(req.params.id, (err, data) => {
        if (err) console.log(err);
        res.json(data);
    });
});

app.post('/editpost', (req, res) => {
    // console.log(req.body)
    model.PostSchema.findByIdAndUpdate(req.body.PostId, {
        $set: {
            PostTitle: req.body.PostTitle,
            Content: req.body.Content
        }
    }, (err, data) => {
        if (err) console.log(err);
        res.redirect('/');
    });
});

app.post('/comment', upload.single('Image'), function (req, res) {
    var PostId = req.body.PostId;
    // console.log(req.body);
    var ImageFile = '';
    if (req.file) {
        uploadMethod.uploadFile.myUpload(req);
        ImageFile = req.file.filename;
    }
    model.CommentSchema.create({
        Content: req.body.Content,
        Date: currentDate,
        Image: ImageFile,
        PostId: PostId,
        Email: req.body.Email,
        FullName: req.body.FullName
    });

    res.json(true);
    // res.redirect('/post-details/' + PostId)
});

app.get('/showcomments/:id', function (req, res) {
    var PostId = req.params.id;
    model.CommentSchema.find()
        .sort({ '_id': -1 })
        .where('PostId')
        .in(PostId)
        .exec(function (err, data) {
            res.json(data);
        });
});

app.get('/getCount/:id', function (req, res) {
    var PostId = req.params.id;
    model.CommentSchema.count({PostId: PostId}, function (err, count) {
        res.json(count);
    });
});