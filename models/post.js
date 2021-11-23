const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const {DateTime} = require('luxon');

const PostSchema = new Schema({
    author: {type: "String", required: true},
    title: {type:"String", required: true},
    text: {type:"String", required: true},
    date: {type: "Date", default: Date.now()},
    comments: []
});

PostSchema.virtual('formattedDate').get(function(){
    return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATE_MED);
});

PostSchema.virtual('url').get(function(){
    return 'api/posts/'+this._id;
});

module.exports=mongoose.model("Post",PostSchema);