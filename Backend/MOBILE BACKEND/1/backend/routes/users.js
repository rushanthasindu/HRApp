var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/";

router.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*')
  next()
})
 // res.writeHead(200, {'Content-Type': 'Access-Control-Allow-Origin: *'});

/* GET users listing. */
router.get('/auth', function(req, res, next) {
  
  response = {
    email:req.query.email,
    password:req.query.password
 };
  // MongoClient.connect(url, function(err, db) {
  //   if (err) throw err;
  //   var dbo = db.db("hr");
  //   var query = { email: response.email,password: response.password };
  //  dbo.collection("employees").find(query).toArray(function(err, result) {
  //  //   dbo.collection("employees").findOne({}, function(err, result) {
  //     if (err) throw err;
  //     console.log(result.name);
  //     // res.json([
  //     //   {id :1, email:response.email,password:response.password}
       
  //     // ]);
  //     res.json(result);
  //     db.close();
  //   });
  // });

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("hr");
    var query = {email: response.email,password: response.password};
    dbo.collection("employees").find(query).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      res.json(result);
      db.close();
    });
  });
   
});

module.exports = router;
