import express from 'express';
import articleController from '../controllers/articleController';

const router=express.Router();

router
   .route('/')
   .get(articleController.getArticles)
   
router
   .route('/new')
   .post(articleController.createArticle);

router
   .route('/:id')
   .get(articleController.getArticle)
   .patch(articleController.updateArticle)
   .delete(articleController.deleteArticle);

module.exports=router
  