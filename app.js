var express = require('express');
var bodyParser = require('body-parser');
var product = require('./src/routes/product');


var connection = require('./config/db');
connection.init();

global.__basedir = __dirname;

var app = express();
var router = express.Router();

process.env.SECRET_KEY="thisismysecretkey";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/secure-api',router);

// validation middleware
router.use(function(req,res,next){
    var token=req.body.token || req.headers['token'];
    if(token){
        jwt.verify(token,process.env.SECRET_KEY,function(err,ress){
            if(err){
                res.status(500).send('Token Invalid');
            }else{
                next();
            }
        })
    }else{
        res.send('Please send a token')
    }
})

router.get('/home',function(req,res){
    res.send('Token Verified')
})

app.use(function (req, res, next) {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
  
});

product.configure(app);

module.exports = app;