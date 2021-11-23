const Post = require("../models/post");
const Comments = require("../models/comment");
const User = require('../models/user');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const passport = require('passport');

const async = require('async');



exports.login_get=function(req,res,next){
    res.render('login',{page:"Admin Login"})
};

exports.login_post=function(req,res,next){

    passport.authenticate('local', {session: false}, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user : user
            });
        }

req.login(user, {session: false}, (err) => {
           if (err) {
               res.send(err);
           }
        


// generate a signed son web token with the contents of user object and return it in the response

const token = jwt.sign(user, process.env.TOKEN_SECRET);
           return res.json({user, token});
        });
    })(req, res);
    res.redirect('/');
};

exports.index=function(req,res,next){
    Post.find({},"title").populate("comments").exec(function(err,posts){
        if(err){return next(err)};
    
        if(posts.length<1){
            res.send("No Posts Published");
            return;
        };
        
        res.send(posts);
       });
}