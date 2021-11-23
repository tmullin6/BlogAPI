const express = require('express');

const adminRouter = express.Router();

const adminController= require("../controllers/adminController");

adminRouter.get('/',function(req,res){res.redirect('/login')});

adminRouter.get('/login',adminController.login_get);
adminRouter.post('/login',adminController.login_post);




module.exports=adminRouter;