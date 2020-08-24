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



mongoose.connect('mongodb+srv://Tuyizere:anastasetuyizere@cluster0.6kcyh.mongodb.net/NewBrand?retryWrites=true&w=majority',
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

app.use('*', function (req, res) { 
    res.status(404).send('Page Not Found');
});

const port=process.env.PORT|| 3000;
app.listen(port,()=>{
    console.log('server running');
})