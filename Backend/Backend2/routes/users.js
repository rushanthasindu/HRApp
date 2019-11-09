var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

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

router.get('/resetPassword', function(req, res, next) {
  
  response = {
    email:req.query.email,
 };
  
var pw=Math.random();   

 MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("hr");
  var myquery = { email:response.email };
  var newvalues = {$set: {password: pw} };
  dbo.collection("employees").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
    db.close();
  });
});



 var transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'service@hotelforyou.xyz',
    pass: 'oGxJe1jk6=oPi@2!zz'
  }
});

var mailOptions = {
  from: 'service@hotelforyou.xyz',
  to: response.email,
  subject: 'Password Reset',
  text: 'Your New Password is  '+pw
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
 
   
});

module.exports = router;
