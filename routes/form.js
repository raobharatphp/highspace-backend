var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer();
const func = require('./../lib/functions');
var mongoose = require('mongoose');

router.get('/', function(req, res, next) {
    res.send('Form Page');
});

router.get('/get/update-profile',func.check_authorize,func.form_get_handler);
router.get('/get/location',func.check_authorize,func.form_get_handler);
router.get('/get/:file',func.form_get_handler);
router.get('/get/complete-listing/:id',func.check_authorize,(req,res)=>{
    const vendor = require('./../models/vendor');
    vendor['Location'].aggregate([
        {$match:{_id:new mongoose.Types.ObjectId(req.params.id),'user-id':new mongoose.Types.ObjectId(req.user.id)}},
        {$lookup:{from:'abouts',localField:'_id',foreignField:'location-id',as:'abouts'}},
        {$lookup:{from:'setups',localField:'_id',foreignField:'location-id',as:'setups'}},
        {$lookup:{from:'photos',localField:'_id',foreignField:'location-id',as:'photos'}},
        {$lookup:{from:'activityamenities',localField:'_id',foreignField:'location-id',as:'activityamenities'}},
        {$group:{_id:"$_id",'space-position':{"$push":"$space-position"},'street-name':{"$push":"$street-name"},'state':{"$push":"$state"},'space-name':{"$first":"$abouts.space-name"},'space-type':{"$first":"$abouts.space-type"},'guests-allowed':{"$first":"$setups.guests-allowed"},'photos':{"$first":"$photos.photos"},'price':{"$first":"$activityamenities.price"}}},
    ]).then(function(location){
        if(typeof location[0]!=='undefined'){
            for(key in location[0]){
                location[0][key]=location[0][key][0];
            }
            location[0]['space-type']=JSON.parse(location[0]['space-type']).join('/');
            location[0]['photos']=JSON.parse(location[0]['photos']);
            if([7,8].indexOf(location[0]['space-position'])>-1){
                location[0]['space-position']=9;
                func.update_space_id(req,{"space-position":9});
            }
            res.json({status:true,form_data:location[0]});
        }else{
            return res.status(401).json({'redirect-url':'vendor/location'});
        }
    }).catch((err)=>{
        console.log(err);
        res.status(400).json({error:true,'errorMsg':'Something went wrong. Please try again.'});
    });
});
router.get('/get/:file/:id',func.check_authorize,func.form_get_handler);

router.post('/post/location',upload.none(),func.check_authorize,func.form_post_handler);
router.post('/post/upload/:file',func.check_authorize,func.form_upload_handler);
router.post('/post/:file/:id',upload.none(),func.check_authorize,func.form_post_handler);
router.post('/post/update-profile',upload.none(),func.check_authorize,func.update_profile_post_handler);

module.exports = router;