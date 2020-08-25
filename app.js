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

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

mongoose.connect('mongodb+srv://AnastaseTuyizere:anastasetuyizere@cluster0.so3mc.mongodb.net/MyBrand?retryWrites=true&w=majority',
{
    useNewUrlParser:true,
    useFindAndModify:false,
    useUnifiedTopology:true
})
.then(()=>{
    console.log('database connected remotely')
})
.catch(err=>{
    console.log(err)
});

// mongoose.connect('mongodb://127.0.0.1:27017',
// {
//     useNewUrlParser:true,
//     useFindAndModify:false,
//     useUnifiedTopology:true
// })
// .then(()=>{
    
//     console.log('database connected locally')
// })
// .catch(err=>{
//     console.log(err)
// })


app.use('/api/v1/blogs',articleRouter);
app.use('/api/v1/users',userRouter);

app.use('*', function (req, res) { 
    res.status(404).send('Page Not Found');
});

const port=process.env.PORT|| 3000;
app.listen(port,()=>{
    console.log('server running');
})