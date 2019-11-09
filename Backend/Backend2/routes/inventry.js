var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

router.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*')
  next()
})
/* GET home page. */
router.get('/', function(req, res, next) {
  
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("hr");
    
    dbo.collection("inventry").find({}).toArray(function(err, result){
     // dbo.collection("inventry").findOne({}, function(err, result) {
      if (err) throw err;
      console.log(result.name);
      // res.json([
      //   {id :1, email:response.email,password:response.password}
       
      // ]);
      res.json(result);
      db.close();
    });
  });

});

router.get('/addNew', function(req, res0, next) {
    response = {
      itemCode:req.query.itemCode,
      description:req.query.description,
      qty:req.query.qty
   };

   MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("hr");
    var myobj = { itemCode: response.itemCode, description:  response.description, qty: response.qty , balance: response.qt};
    dbo.collection("inventry").insertOne(myobj, function(err, res) {
      if (err)  res0.json([
        {status :false}
       
      ]);
      console.log("1 document inserted");
      res0.json([
        {status :true}
       
      ]);
      db.close();
    });
  });
    // res.json([
    //   {id :1, email:response.email,password:response.password}
     
    // ]);
  });

module.exports = router;

