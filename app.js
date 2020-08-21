import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import { async } from 'regenerator-runtime';
import bodyParser, { urlencoded } from 'body-parser';

import articleRouter from './routers/articleRouters';
import userRouter from './routers/userRouters';

const app=express();

app.use(morgan('dev'));

app.use(bodyParser.json());

app.use((req,res,next)=>{
    next();
})

mongoose.connect('mongodb://127.0.0.1:27017/MyBrand',
{
    useNewUrlParser:true,
    useFindAndModify:false,
    useUnifiedTopology:true
})
.then(()=>{
    
    console.log('database connected successfully')
})
.catch(err=>{
    console.log(err)
})

app.use('/api/v1/blogs',articleRouter);
app.use('/api/v1/users',userRouter);


const port=process.env.PORT|| 3000;
app.listen(port,()=>{
    console.log('server running');
})