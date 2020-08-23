import User from '../models/userModel';

exports.getAllUsers=async(req,res)=>{
    try{
        const users=await User.find();

        res.status(500).json({
            status:'succcess',
            results:users.length,
            data:{
               users
            }
        });
    }
    catch(err){
        res.status(500).json({
            status:'error',
            message:'This is router is not yet defined!'
        });
    }
}

exports.createUser=(req,res)=>{
    res.status(500).json({
        status:'error',
        message:'This is router is not yet defined!'
    });
}

exports.getUser=(req,res)=>{
    res.status(500).json({
        status:'error',
        message:'This is router is not yet defined!'
    });
}

exports.deleteUser=(req,res)=>{
    res.status(500).json({
        status:'error',
        message:'This is router is not yet defined!'
    });
}

exports.updateUser=(req,res)=>{
    res.status(500).json({
        status:'error',
        message:'This is router is not yet defined!'
    });
}