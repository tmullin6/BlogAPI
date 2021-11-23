const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const {DateTime} = require("luxon");

const CommentSchema = new Schema({
    author: {type: "String", required: true},
    text: {type:"String", required: true},
    date: {type: "Date", default: Date.now()}
});

CommentSchema.virtual('formattedDate').get(function() {
    return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATE_MED);
});

module.exports=mongoose.model("Comment",CommentSchema);