const fs = require('fs')
const jwt = require("jsonwebtoken");
const vendor = require('./../models/vendor');
const multer = require('multer');
const path = require('path');
const {v4:uuid_v4} = require('uuid');

function check_authorize(req,res,next){
  const authHeader=req.headers.authorization;
  if (authHeader) {
      const token = authHeader.split(' ')[1];
      jwt.verify(token,process.env.SECRET_KEY,(err, user) => {
          if(err){
            return res.sendStatus(403);
        }
        req.user = user;
        req.user.id = user._id;
        next();
      });
  } else {
      res.sendStatus(401);
  }
}
function update_token(req,user){
    let payload=req.user;
    const {User} = require("./../models/users");
    return User.updateOne({_id:req.user.id},user).then(function(newUser){
        if(newUser.nModified){
            for(key in user){
                payload[key]=user[key];
            }          
            return jwt.sign(payload,process.env.SECRET_KEY);
        }else{
            return false;
        }
    }).catch(err=>{return false;});
}
function update_space_id(req,update_obj){
    find_obj={_id:req.params.id,'user-id':req.user.id};
    vendor['Location'].updateOne(find_obj,update_obj).then(function(newUser){});
}

function form_get_handler(req, res) {
    if(typeof req.params.file==='undefined'){
        req.params.file=req.route.path.replace('/get/','');
    }
    const file=req.params.file;
    if(typeof req.user!=='undefined'){
        req.params.file='auth/'+req.params.file;
    }
    if(fs.existsSync(__dirname+'/forms/'+req.params.file+'.js')){
        var obj=JSON.parse(JSON.stringify(require('./forms/'+req.params.file)));
        var m_file=file.split('-');
        var model='';
        for(var i=0;i<m_file.length;i++){
            model+=m_file[i].charAt(0).toUpperCase()+m_file[i].slice(1);
        }
        model=model=='Profile'?'Source':model;
        if(typeof req.user!=='undefined' && typeof vendor[model]!=='undefined' && typeof req.params.id!=='undefined'){
            if(req.params.id.length!=24){
                return res.status(401).json({'redirect-url':'vendor/location'});
            }
            if(file=='payment-details'){
                var find_obj={"user-id":req.user.id};
                vendor[model].find(find_obj).then((currentUser)=>{
                    if(currentUser){
                        var bank=[];
                        for(var i=0;i<currentUser.length;i++){
                            var acc_no=currentUser[i]['account-number'].toString();
                            acc_no=acc_no.substr(0,4)+' '+'X'.repeat(acc_no.length-8)+' '+acc_no.substr(acc_no.length-4,4);
                            bank.push({'id':currentUser[i]['_id'],'name':currentUser[i]['name'],'account-number':acc_no});
                        }
                        obj.form_data['form-id']=currentUser['_id'];
                        obj.form_data['payment-details']={
                            data:bank,
                        };
                        vendor['Location'].findOne({_id:req.params.id,'user-id':req.user.id}).then((curUser)=>{
                            if(curUser){
                                obj.form_data['payment-details']['defaultValue']=curUser['paymentdetail-id'];
                                obj.form_data['space-position']=curUser['space-position'];
                            }
                            res.json(obj.form_data);
                        }).catch(err=>{
                            res.json(obj.form_data);
                        });
                    }
                }).catch(err=>{
                    res.json(obj.form_data);
                });
            }else{
                var find_obj=file=='location'?{_id:req.params.id,'user-id':req.user.id}:(file=='profile'?{'user-id':req.user.id}:{"location-id":req.params.id});
                var func=vendor[model].findOne(find_obj);
                if(typeof find_obj['location-id']!=='undefined'){
                    func.populate('location-id','user-id');
                }
                func.then(async (currentUser)=>{
                    if(currentUser){
                        for(var key in obj.form_data['fields']){
                            if(typeof obj.form_data['field-type'][key]==='undefined'){
                                obj.form_data['field-type'][key]={attr:{}};
                            }
                            if(typeof obj.form_data['field-type'][key]['attr']==='undefined'){
                                obj.form_data['field-type'][key]['attr']={};
                            }
                            obj.form_data['field-type'][key]['attr']['defaultValue']=currentUser[key];
                        }
                        obj.form_data['form-id']=currentUser['_id'];
                        if(typeof find_obj['location-id']!=='undefined' && currentUser['location-id']['user-id']!=req.user.id){
                            return res.status(401).json({'redirect-url':'vendor/location'});
                        }
                        if(file=='location'){
                            obj.form_data['space-position']=currentUser['space-position'];
                        }
                    }else if(file=='location'){
                        return res.status(401).json({'redirect-url':'vendor/location'});
                    }
                    if(file!='location'){
                        const location=await vendor['Location'].findOne({"_id":req.params.id});
                        obj.form_data['space-position']=location['space-position'];
                    }
                    if(file==='profile'){
                        vendor['Profile'].find(find_obj).exec(function(err,profile){
                            if(err){
                                return res.json(obj.form_data);
                            }
                            var pro_arr=[];
                            for(var i=0;i<profile.length;i++){
                                pro_arr.push({id:profile[i].id,name:profile[i]['first-name']+' '+profile[i]['last-name'],mobile:profile[i]['mobile']});
                            }
                            obj.form_data['profiles']=pro_arr;
                            res.json(obj.form_data);
                        });
                    }else{
                        res.json(obj.form_data);
                    }
                }).catch(err=>{
                    res.json(obj.form_data);
                });
            }
        }else{
            res.json(obj.form_data);
        }
    }else{
        res.status(404).send('File Not Found');
    }
}

function form_post_handler(req, res) {
    if(typeof req.params.file==='undefined'){
        req.params.file=req.route.path.replace('/post/','');
    }
    const step_list=['location','about','setup','photos','availability','cancellations','activity-amenities','profile','payment-details'];
    if(step_list.indexOf(req.params.file)>-1){
        req.body['user-id']=req.user.id;
        var find_obj={id:0};
        if(typeof req.params.id!=='undefined'){
            req.body['location-id']=req.params.id;
            find_obj=req.params.file=='location'?{_id:req.params.id,'user-id':req.user.id}:(req.params.file=='profile'?{'user-id':req.user.id}:{"location-id":req.params.id});
        }
        var m_file=req.params.file.split('-');
        var model='';
        for(var i=0;i<m_file.length;i++){
            model+=m_file[i].charAt(0).toUpperCase()+m_file[i].slice(1);
        }
        model=model=='Profile'?'Source':model;
        if(typeof vendor[model]!=='undefined'){
            if(req.params.file=='location'){
                req.body['profile-type']=0;
            }
            if(req.params.file=='setup'){
                req.body['age-restriction']=typeof req.body['age-restriction']!=='undefined'?req.body['age-restriction']:0;
            }
            if(['photos','profile'].indexOf(req.params.file)>-1){
                let pic_arr=typeof req.body.photos!=='undefined'?req.body.photos:(typeof req.body['profile-pic']!=='undefined'?[req.body['profile-pic']]:[]);
                pic_arr.map((val,key)=>{
                    if(val.length>0){
                        const prefix=__dirname+'/../../client/public/';
                        if(fs.existsSync(prefix+'tmp/'+val)){
                            fs.rename(prefix+'tmp/'+val,prefix+'uploads/'+val,function(err){});
                        }
                    }
                });
            }
            if(req.params.file==='profile' && typeof req.body['first-name']!=='undefined'){
                new vendor['Profile'](req.body).save(function(err,profile){
                    if(err){
                        console.log(err);
                        return false; 
                    }
                    req.body['profile-id']=profile.id;
                });
            }
            vendor[model].findOne(find_obj).then((currentUser)=>{
                if(currentUser){
                    vendor[model].updateOne(find_obj,req.body).then(function(newUser){
                        res.json({status:true,id:newUser.id});
                    }).catch(err=>{
                        console.log(err);
                        res.status(400).json({error:true,'errorMsg':'Something Went wrong. Please try again.'});
                    });
                }else{
                    if((typeof req.body['account-number']!=='undefined' && req.params.file==='payment-details') || req.params.file!=='payment-details'){
                        new vendor[model](req.body).save().then(function(newUser){
                            if(req.params.file!=='location'){
                                let update_obj=req.params.file==='payment-details'?{"paymentdetail-id":newUser.id}:{"space-position":(step_list.indexOf(req.params.file)+1)};
                                update_space_id(req,update_obj);
                            }
                            if(typeof req.user["is-vendor"]==='undefined' || req.user["is-vendor"]===false){
                                update_token(req,{"is-vendor":true}).then(function(token){
                                    if(token){
                                        res.json({status:true,id:newUser.id,token:token});
                                    }else{
                                        res.json({status:true,id:newUser.id});
                                    }
                                });
                            }else{
                                res.json({status:true,id:newUser.id});
                            }
                        }).catch(err=>{
                            console.log(err);
                            res.status(400).json({error:true,'errorMsg':'Something Went wrong. Please try again.'});
                        });
                    }else if(typeof req.body['paymentdetail-id']!=='undefined' && req.body['paymentdetail-id'].length>0){
                        find_obj={_id:req.params.id,'user-id':req.user.id};
                        vendor['Location'].updateOne(find_obj,{"paymentdetail-id":req.body['paymentdetail-id']}).then(function(newUser){
                            if(newUser){
                                res.json({status:true,id:req.body['paymentdetail-id']});
                            }
                        }).catch(err=>{                        
                            console.log(err);
                            res.status(400).json({error:true,'errorMsg':'Something Went wrong. Please try again.'});
                        });
                    }else{
                        res.status(400).json({error:true,'errorMsg':'Something Went wrong. Please try again.'});
                    }
                }
            }).catch(err=>{
                console.log(err);
                res.status(400).json({error:true,'errorMsg':'Something Went wrong. Please try again.'});
            });
        }else{
            res.json({error:true,'errorMsg':'Invalid Request.'});
        }
    }
}

function update_profile_post_handler(req, res) {
    const {User} = require("./../models/users");
    req.body['others']={
        about:req.body.about,
        address:req.body.address,
        birthday:req.body.birthday,
        "aadhar-number":req.body['aadhar-number'],
    };
    User.updateOne({_id:req.user.id},req.body).then(function(newUser){
        if(newUser.nModified){
            User.findOne({_id:req.user.id}).then(function(currentUser){
                let payload=JSON.parse(JSON.stringify(currentUser));
                payload.iat=req.user.iat;
                payload.exp=req.user.exp;
                res.json({status:true,id:req.user.id,token:jwt.sign(payload,process.env.SECRET_KEY)});
            }).catch(err=>{
                res.json({error:true,'errorMsg':'Invalid Request.'});
            });
        }else{
            res.json({error:true,'errorMsg':'Invalid Request.'});
        }
    }).catch(err=>{
        console.log(err);
        res.json({error:true,'errorMsg':'Invalid Request.'});
    });
}

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null,'../client/public/tmp/');
    },
    filename: function(req, file, cb) {
        cb(null, uuid_v4() + path.extname(file.originalname));
    }
});
const imageFilter = function(req, file, cb, obj) {
    if(typeof obj.form_data['field-type'][file.fieldname]!=="undefined" && typeof obj.form_data['field-type'][file.fieldname]['attr']['accept']!=="undefined"){
        var ext=obj.form_data['field-type'][file.fieldname]['attr']['accept'].replace(/,/g,'|');
        if (!file.originalname.toLowerCase().match(new RegExp(`(${ext})`))){
            req.fileValidationError = obj.form_data['field-type'][file.fieldname]['attr']['errors'];
            return cb(new Error(req.fileValidationError), false);
        }
    }
    cb(null, true);
};

function form_upload_handler(req,res){
    req.params.file='auth/'+req.params.file;
    if(fs.existsSync(__dirname+'/forms/'+req.params.file+'.js')){
        var obj=require('./forms/'+req.params.file);
        try{
        let upload = multer({ storage:storage, fileFilter:(req, file, cb)=> imageFilter(req, file, cb, obj) }).any();
        upload(req, res, function(err) {
            if (req.fileValidationError) {
                res.send(req.fileValidationError);
            }else if (!req.files) {
                res.send('Please select a file to upload');
            }else if (err instanceof multer.MulterError) {
                res.status(400).json({error:true,'errorMsg':'Something went wrong. Please try again.'});
            }else if (err) {
                res.status(400).json({error:true,'errorMsg':'Something went wrong. Please try again.'});
            }else{
                var files=[];
                for(var i=0;i<req.files.length;i++){
                    files.push(req.files[i].filename);
                }
                res.json({status:true,files:files});
            }
        });
        }catch(err){
            console.log(err);
        }
    }
}

module.exports={check_authorize,form_get_handler,form_post_handler,form_upload_handler,update_space_id,update_profile_post_handler};