import User from '../models/userModel';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {promisify} from 'util';

const signinToken=id=>{
    return jwt.sign({id},'jsonWebToken_Password_Webtoken_Secret',{
        expiresIn:'90d'
});
};

exports.signUp=async(req,res)=>{
   try{
    const newUser=await User.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        passwordConfirm:req.body.passwordConfirm
    });
    const token=signinToken(newUser._id);
    res.status(201).json({
        status:'success',
        token,
        data:{
            user:newUser
        }
    })
   }
   catch(err){
    res.status(404).json({
        status:'fail',
        message:err
    })
  }
    
}

exports.login=async(req,res)=>{
        
            
          const {email,password}=req.body;

             if(!email || !password){
                return res.status(400).send({message:"Please input password or email"});
             }
              const user=await User.findOne({email}).select('+password');          
            
              if(!user || !(await user.correctPassword(password,user.password))){
                  return res.status(400).send({message:"Password is invalid!"});
                  };
            
            
          //sending token
          const token=signinToken(user._id);
          res.status(201).json({
            status:'success',
            message:'The email and password valid,Logged In',
            token,
        })
        }

        exports.protect=async (req,res,next)=>{
            // Getting token and check if is there
            let token;
             if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
                 token=req.headers.authorization.split(' ')[1];
             }
        
             if(!token){
                res.status(401).json({
                    status:'fail',
                    message:'You are not logged in! please log in to get access'
                });
                return;
             }
            //verification token
            let decoded;
            try{
           decoded=await promisify(jwt.verify)(token,'jsonWebToken_Password_Webtoken_Secret')
           }
           catch(err){
            res.status(401).json({
                status:'fail',
                message:'invalid token,login to get one'
            })
           }
            //check if user still  exist
           const frestUser= await User.findById(decoded.id);
           if(!frestUser){
            res.status(401).json({
                status:'fail',
                message:'token is no long accepted'
            })
           }
            next();
        }