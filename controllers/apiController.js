const Post = require("../models/post");
const Comment = require("../models/comment");
const {body,validationResult} = require("express-validator");
const async = require('async');


exports.get_posts = function(req,res,next){
   Post.find({},"title").populate("comments").exec(function(err,posts){
    if(err){return next(err)};

    if(posts.length<1){
        res.send("No Posts Published");
        return;
    };

    res.json(posts);
   })
};

exports.get_post_details= function(req,res, next){
    Post.findById(req.params.id).exec(function(err,post){
        if(err){return next(err)};

        if(post===null){
            let error = new Error("Post Not Found");
            error.status=404;
            return next(error);
        };

        res.json(post);
    })
};

exports.post_comment= [

    body('author').trim().isLength({min:1}).escape().withMessage("Only Alphanumeric Characters Allowed"),
    body('text').trim().isLength({min:1}).escape(),

    (req,res,next)=>{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            res.json({errors: errors})
        };

        let comment = new Comment({
            author: req.body.author,
            text: req.body.text,
        });

        Post.updateOne({'_id':req.params.id},{$push :{'comments': comment}},function(err){
            if(err){return next(err)};

            res.redirect('/api/posts/'+req.params.id);
        })
        
    }];


