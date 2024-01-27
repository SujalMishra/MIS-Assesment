const express=require('express');

const router=express.Router();

const {Login}=require('../controllers/admin');

router.post('/login',Login);



module.exports=router;