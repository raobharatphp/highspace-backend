var express = require('express');
var router = express.Router();
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
const {User} = require("./../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");
let time="1d";

function verify_captha(req,res,next){
  const secret_key = '6LeQrqsZAAAAABjmRC4wwmEFa885jetYqB24bQg6';
  const token = req.body.recaptha_token;
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${token}`;
  axios.post(url)
  .then(res => {
    if(typeof res.data.success!=='undefined' && res.data.success===true){
      next();
    }else{
      res.json({error:true,'errorMsg':'Google Captcha not verified.'});
    }
  })
  .catch(error =>{
    res.json({error:true,'errorMsg':'Google Captcha not verified.'});
  });
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/forget-password',upload.none(),verify_captha,function(req, res, next) {
  var find_obj={email:req.body.email,provider:'highspace'};
  User.findOne(find_obj).then((currentUser)=>{
    if(currentUser){
    }else{
      res.json({error:true,'errorMsg':'This email is not registered with us.'});
    }
  });
});

router.post('/login',upload.none(),verify_captha,function(req, res, next) {
  var find_obj={email:req.body.email,provider:'highspace'};
  User.findOne(find_obj).then((currentUser)=>{
      bcrypt.compare(req.body.password,currentUser.password,(err,resp) => {
          if(resp){
              var payload=JSON.parse(JSON.stringify(currentUser));
              time=(typeof req.body['remember-me']!=='undefined'?'30d':time);
              let token = jwt.sign(payload,process.env.SECRET_KEY,{
                  expiresIn:time
              });
              res.json({token:token,time:time});
          }else{
            res.json({error:true,'errorMsg':'Invalid Crediential.'});
          }
        });
  }).catch(err=>{
      res.json({error:true,'errorMsg':'Invalid Email Address.'});
  });
});

router.post('/signup',upload.none(),verify_captha,function(req,res,next){
  if(typeof req.body.provider!=='undefined'){
    req.body.password=req.body.token;
    var name=req.body['name'].split(' ');
    req.body['first-name']=name[0];
    req.body['last-name']=name[1];
  }
  var find_obj={email:req.body.email,provider:(typeof req.body.provider!=='undefined'?req.body.provider:'highspace')};
  User.findOne(find_obj).then((currentUser)=>{
    var token=false;
    if(currentUser){
      if(typeof req.body.provider!=='undefined'){
        User.updateOne(find_obj,req.body).then(function(newUser){
          req.body.id=currentUser.id;
          token = jwt.sign(req.body,process.env.SECRET_KEY,{
            expiresIn:time
          });
          res.json({token:token,time:time});
        }).catch(err=>{
          res.json({error:true,'errorMsg':'Database Issue. Your entries not capture in the database.'});
        });;
      }else{
        res.json({errorMsg:'Email Id already registered.'});
      }
    }else{
        bcrypt.hash(req.body.password,10,(err,hash) => {
            req.body.password = hash;
            if(typeof req.body.provider!=='undefined'){
              req.body.password=req.body.token;
            }
            new User(req.body).save().then(function(newUser){
              if(typeof req.body.provider!=='undefined'){
                var payload=JSON.parse(JSON.stringify(newUser));
                token = jwt.sign(payload,process.env.SECRET_KEY,{
                  expiresIn:time
                });
                res.json({token:token,time:time});
              }else{
                res.json({status:true});
              }
            }).catch(err=>{
              console.log(err);
              res.json({error:true,'errorMsg':'Database Issue. Your entries not capture in the database.'});
            });
        });
    }
  }).catch(err=>{
    console.log(err);
    res.json({error:true,'errorMsg':'Something went wrong. Please try again.'});
  });
});

module.exports = router;
