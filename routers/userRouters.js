import express from 'express';
import userController from '../controllers/userController';
import authController from  '../controllers/authcontroller';

const router=express.Router();

router.post('/signUp',authController.signUp);
router.post('/login',authController.login);

router
  .route('/')
  .get(authController.protect, userController.getAllUsers)
  .post(userController.createUser)

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports=router;