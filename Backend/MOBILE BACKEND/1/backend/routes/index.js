 var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  response = {
    email:req.query.email,
    password:req.query.password
 };
  res.json([
    {id :1, email:response.email,password:response.password}
   
  ]);
});

module.exports = router;

