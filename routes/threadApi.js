var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const Thread = require('../modules/thread');

router.get('/', (req,res)=>{
 
  Thread.aggregate([
    {$match: {itemId: {$exists: false}}}
  ]).exec(async (err, result) =>{ 
    if(err) return res.send(err)
      res.send(result)
    });
})

// Take detail by id of thread
router.get('/detail/:id', (req,res)=>{

  let query = [
    {
      $match: { _id: mongoose.Types.ObjectId(req.params.id)}
    }, 
    {
      $graphLookup: {
         from: 'threads',
         startWith: "$_id",

         connectFromField: "_id",
         connectToField: "itemId",
         as: "comments",
      
      }
   }, 
  
    {$lookup: {
      from: "threads",
      let: {
        temp: "$_id"
      },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: ["$itemId", "$$temp"]
            }
          }
        },
        {
          $graphLookup: {
            from: 'threads',
            startWith: "$_id",
   
            connectFromField: "_id",
            connectToField: "itemId",
            as: "comments",
         
         }
      }      
      ],
      as: "comments"}
    }
    
     
   
  ]
  Thread.aggregate(query).exec(async (err, result) =>{ 
    if(err) return res.send(err)
      res.send(result)
    });
})

router.post('/create', (req,res)=>{
    let data = req.body
      var newThread = new Thread (data);
      newThread.save((err,result)=> {
          if (err){
           res.send(err)
         }else{
            res.send(result)
         }
      });
})


router.put('/update', (req,res)=>{
  console.log(req.body)
  let data = req.body
  Thread.findOneAndUpdate({_id:mongoose.Types.ObjectId(data._id)},data,(err,update)=>{
      console.log(update)
    })

})



module.exports = router;
