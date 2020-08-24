import express from 'express';
import articleController from '../controllers/articleController';
import authcontroller from '../controllers/authcontroller';

const router=express.Router();

router
   .route('/')
   .get(authcontroller.protect,articleController.getArticles)
   
router
   .route('/new')
   .post(authcontroller.protect,articleController.createArticle);

router
   .route('/:id')
   .get(authcontroller.protect,articleController.getArticle)
   .patch(authcontroller.protect,articleController.updateArticle)
   .delete(authcontroller.protect,articleController.deleteArticle);

module.exports=router
  