import User from '../models/userModel';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

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
                  return res.status(400).send({message:"Password is incorrect!"});
                  };
            
            
          //sending token
          const token=signinToken(user._id);
          res.status(201).json({
            status:'success',
            message:'Logged In',
            token,
        })
        }
