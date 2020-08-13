import express from 'express';
import mongoose from 'mongoose'
import { async } from 'regenerator-runtime';
import bodyParser, { urlencoded } from 'body-parser';

const app=express();
// app.use(bodyParser,urlencoded({extended:true}));
app.use(bodyParser.json());


mongoose.connect('mongodb://127.0.0.1:27017/MyBrand',{useNewUrlParser:true})
.then(()=>{
    
    console.log('database connected successfully')
})
.catch(err=>{
    console.log(err)
})

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


app.get('/',(req,res)=>{
    res.sendFile('Homepage')
});

app.get('/blogs',async (req,res)=>{
try{
    const blogs=await Article.find();
    res.status(200).json({
      status:'success',
      results:blogs.length,
      data:{
          blogs
      }
  })
}catch(err){
   res.status(500).json({
       status:'fail',
       message:err
   })
 }
})


app.post('/create/blog',async (req,res)=>{
    try{
    const newArticle=await Article.create(req.body);
    res.status(201).json({
        data:{
            article:newArticle
        }
    })
}catch(err){
    res.status(400).json({
        status:'fail',
        message:err
    })
}
})



app.patch('/edit',(req,res)=>{
    res.send('update article');
})
app.delete('/delete',(req,res)=>{
    res.send('delete article');
})
app.post('/create/question',(req,res)=>{
    res.send('create question')
})
app.get('/questions',(req,res)=>{
    res.send('get All questions')
})
app.post('/login',(req,res)=>{
    res.send('you can login here')
})
app.post('/signup',(req,res)=>{
    res.send('you can sign up here')
})
app.post('/contactMe',(req,res)=>{
    res.send('you can contact Me here')
})
app.listen(3000,()=>{
    console.log('server running');
})