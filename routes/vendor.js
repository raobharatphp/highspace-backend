var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer();
const func = require('./../lib/functions');
var mongoose = require('mongoose');
const vendor = require('./../models/vendor');

router.get('/', function(req, res, next) {
    res.send('Vendor Dashboard');
});

function default_val(v,k,val=''){
    return typeof v[k]!=='undefined'?v[k]:val;
}
router.get('/get/spaces',func.check_authorize,(req,res)=>{
    vendor['Location'].aggregate([
        {$match:{'user-id':new mongoose.Types.ObjectId(req.user.id)}},
        {$lookup:{from:'abouts',localField:'_id',foreignField:'location-id',as:'abouts'}},
        {$lookup:{from:'photos',localField:'_id',foreignField:'location-id',as:'photos'}},
        {$group:{_id:"$_id",'space-position':{"$first":"$space-position"},'space-name':{"$first":"$abouts.space-name"},'photos':{"$first":"$photos.photos"}}},
        {$sort:{_id:-1}}
    ]).then(function(location){
        for(key in location){
            location[key]['space-name']=default_val(location[key]['space-name'],0);
            location[key]['photos']=JSON.parse(default_val(location[key]['photos'],0,'[""]'))[0];
            location[key]['id']=location[key]['_id'];
        }
        res.json({status:true,space_data:location});
    }).catch((err)=>{
        console.log(err);
        res.status(400).json({error:true,'errorMsg':'Something went wrong. Please try again.'});
    });
});
router.get('/get/blockslot/:id/:year',upload.none(),func.check_authorize,(req,res)=>{
    vendor['Location'].findOne({_id:req.params.id,'user-id':req.user.id}).then((curUser)=>{
        vendor['BlockSlot'].find({'location-id':req.params.id,$where:`return this.date.getFullYear()==${req.params.year}`}).then((blockslot)=>{
            res.json({status:true,data:blockslot});
        }).catch(err=>{
            console.log(err);
            res.status(400).json({error:true,'errorMsg':'Something went wrong. Please try again.'});
        });
    }).catch(err=>{
        res.status(400).json({error:true,'errorMsg':'Something went wrong. Please try again.'});
    });
});
router.post('/post/blockslot/:id',upload.none(),func.check_authorize,(req,res)=>{
    req.body['location-id']=req.params.id;
    if(typeof req.body['time']==='undefined'){
        req.body['time']=[];
    }
    vendor['Location'].findOne({_id:req.params.id,'user-id':req.user.id}).then((curUser)=>{
        if(curUser){
            if(typeof req.body['date-unblock']!=='undefined'){
                vendor['BlockSlot'].deleteOne({_id:req.body['date-unblock'],'location-id':req.params.id}).then((blockslot)=>{
                    res.json({status:true,id:req.body['date-unblock']});
                }).catch(err=>{
                    res.status(400).json({error:true,'errorMsg':'Something went wrong. Please try again.'});
                });
            }else{
                new vendor['BlockSlot'](req.body).save(function(err,blockslot){
                    if(err){
                        console.log(err);
                        res.status(400).json({error:true,'errorMsg':'Something went wrong. Please try again.'});
                    }
                    res.json({status:true,data:blockslot});
                });
            }
        }
    }).catch(err=>{
        res.status(400).json({error:true,'errorMsg':'Something went wrong. Please try again.'});
    });
});

module.exports = router;