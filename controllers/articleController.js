import Article from '../models/articleModel';

exports.getArticles=async (req,res)=>{
    try{
        const blogs=await Article.find();
        res.status(200).json({
          status:'success',
          results:blogs.length,
          articles:{
              blogs
          }
      })
    }catch(err){
       res.status(404).json({
           status:'fail',
           message:'Articles does not exist'
       })
     }
    }

exports.createArticle=async (req,res)=>{
    const newArticle=await Article.create(req.body);
    if(!newArticle) return res.status(405).json({
            status:'fail',
            message:'Unable to create an article'
        })
    
    res.status(201).json({
        data:{
            article:newArticle
        }
    })
}

exports.getArticle=async(req,res)=>{
    try{
        const article=await Article.findById(req.params.id);
          res.status(200).json({
              status:'success',
              data:{
                  article:article,
              }
          })
      }
      catch(err){
          res.status(404).json({
              status:'fail',
              message:'Invalid id of an article'
          })
      }
}

exports.updateArticle=async(req,res)=>{
    try{
      const article=await Article.findByIdAndUpdate(req.params.id,req.body,{
          new:true,
          runValidators:true
      });
        res.status(200).json({
            status:'success',
            data:{
                article:article,
            }
        })
    }
    catch(err){
        res.status(404).json({
            status:'fail',
            message:'Invalid id'
        })
    } 
}

exports.deleteArticle=async (req,res)=>{
    try{
        const article=await Article.findByIdAndDelete(req.params.id);
          res.status(204).json({
              status:'success',
              data:null,
          })
      }
      catch(err){
          res.status(400).json({
              status:'fail',
              message:'Invalid id'
          })
        }
}