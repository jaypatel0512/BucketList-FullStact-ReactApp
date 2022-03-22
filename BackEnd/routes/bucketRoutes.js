
const express = require('express');
let Bucket = require('../models/Bucket');


const authMiddleware = require('../Middlewares/authMiddleware')
const router = express.Router();

const {check, validationResult} = require('express-validator');
const req = require('express/lib/request');

//fetch all the buckets
router.get('/',authMiddleware,async(req,res)=>{
    try{
      //  const bucketDB = await Bucket.find();
        const bucketDB = await Bucket.find({user: req.user.id});
        res.send(bucketDB);
    }
    catch(err){
        return res.status(404).send('server error');
    }
});

//get the bucket by id
router.get('/:id',async (req,res)=>{
    try{
    const bucket = await Bucket.findById(req.params.id);
    if (!bucket){
        return res.status(404).send('bucket not found');
    }
    res.send(car);
    }
catch(err){
    return res.status(404).send('bucket not found');
}
});

// add new bucket
router.post(
    '/',
    authMiddleware,
[
    check('name', 'name ie required').not().isEmpty(),
    check('desc', 'desc ie required').not().isEmpty(),
    check('status', 'status is required').isLength({ min: 4, max:5 })
],
async(req,res) =>{

    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }
        console.log('no error')
        const newBucket = await Bucket.create({
        user: req.user.id,
        name: req.body.name,
        desc: req.body.desc,
        status: req.body.status,
    });
    res.send(newBucket);
   
}catch(err){
    return res.status(404).send('bucket not created');
}   


    
});

//delete bucket by id
router.delete('/', async(req, res) => {
    //find the bucket by id
    try{
        const bucket = await Bucket.findOneAndRemove({_id : req.body.id});
        if (!bucket){
            return res.status(404).send('bucket not found');
        }
        res.send('Bucket Deleted');
        }
    catch(err){
        return res.status(404).send('bucket not found');
    }
  });

router.put('/', async(req, res) => {
    
    try{
        const bucket = await Bucket.findById(req.body.id);
        if (!car){
            return res.status(404).send('bucket not found');
        }
        bucket.name = req.body.name;
        bucket.desc = req.body.desc; 
        bucket.status = req.body.status;
        await bucket.save();
        res.send(bucket);
        }
    catch(err){
        return res.status(404).send('bucket not found');
    }
  
   
  });
  

module.exports = router;