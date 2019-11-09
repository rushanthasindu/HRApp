var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var app = express();
var url = "mongodb://localhost:27017/";
app.use(express.static('public'));

app.use(function (req, res, next) {

   // Website you wish to allow to connect
   res.setHeader('Access-Control-Allow-Origin : *', 'http://localhost:8081');

   // Request methods you wish to allow
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

   // Request headers you wish to allow
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

   // Set to true if you need the website to include cookies in the requests sent
   // to the API (e.g. in case you use sessions)
   res.setHeader('Access-Control-Allow-Credentials', true);

   // Pass to next layer of middleware
   next();
});



app.get('/auth', function (req, res) {
   // Prepare output in JSON format
   response = {
      email:req.query.email,
      password:req.query.password
   };
   MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("hr");
      var query = { email: response.email ,  password: response.password };
      dbo.collection("employees").find(query).toArray(function(err, result) {
        if (err) throw err;
        if (result=="") res.end( JSON.stringify(response = {status: "false"}));
        else res.end( JSON.stringify(response = {status: "true"}));
        
       // console.log(result);
        db.close();
      });
     // res.end( JSON.stringify(response = {status: "false"}));
    });
})




app.get('/getLeaveHistory', function (req, res) {
   
 
   MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("hr");
     // var query = { email: response.email ,  password: response.password };
      dbo.collection("employeeleaves").find({}).toArray(function(err, result) {
         if (err) throw err;
         console.log(result);
         res.end( JSON.stringify(result));
         db.close();
       });
     
    });
})


app.post('/addUser', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      data = JSON.parse( data );
      data["user4"] = user["user4"];
      console.log( data );
      res.end( JSON.stringify(data));
   });
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})