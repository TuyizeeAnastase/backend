import mongoose from 'mongoose';

const articleSchema=new mongoose.Schema({
    title:String,
    author:String,
    content:String,
    comments:[{
        content:String,
        date:Date
    }],
    date:{
        type:Date,
        default:Date.now
    }
})

const Article=mongoose.model('Article',articleSchema);

module.exports=Article;