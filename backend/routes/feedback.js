const express=require('express');
const router = express.Router();

const {getAll,getOne,AddFeedback}=require('../controllers/feedback');

router.get('/',getAll);

router.get('/:id',getOne);

router.post('/',AddFeedback);

module.exports = router;