const express =require('express');
const router=express.Router();
const userRouter=require('./userRoutes.js');
const adminRouter=require('./adminRoutes.js');
router.use('/admin',adminRouter);
router.use('/user',userRouter)

module.exports= router;
