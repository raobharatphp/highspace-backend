var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId

const string={
    type:String,
    required:true
}
const number={
    type:Number,
    required:true
}
const json_obj=(req=false)=>{
    var obj={
        type:String,
        get:function(data) {
          try { 
            return JSON.parse(data);
          } catch(err) { 
            return data;
          }
        },
        set:function(data) {
          data=['string','boolean'].indexOf(typeof data)>-1?[data]:data;
          return JSON.stringify(data);
        }
    }
    if(req==='number'){
        obj.type=Number;
    }else if(req===true){
        obj.required=true;
    }
    return obj;
};

var locationSchema = new Schema({
    "user-id":{
        type:ObjectId,
        required:true,
        ref:'user'
    },
    "paymentdetail-id":{
        type:ObjectId,
        ref:'paymentdetail'
    },
    "address":string,
    "latitude":number,
    "longitude":number,
    "landmark":string,
    "state":string,
    "district":string,
    "street-name":string,
    "zip-code":string,
    "profile-type":number,
    "other":String,
    // "other":{
    //     type:Boolean,
    //     default:false
    // },
    "space-position":{
        type:Number,
        default:1
    }
},{ timestamps: true});

var aboutSchema = new Schema({
    "space-type":json_obj(),
    "space-name":string,
    "description":string,
    "instruction":String,
    "location-id":{
        type: ObjectId,
        required:true,
        ref:'location'
    }
},{ timestamps: true});

var setupSchema = new Schema({
    "floor-area":string,
    "multiple-floors":json_obj(),
    "age-restriction":number,
    "guests-allowed":number,
    "common-rules":json_obj(),
    "other-rules":String,
    "location-id":{
        type: ObjectId,
        required:true,
        ref:'location'
    }
},{ timestamps: true});

var photoSchema = new Schema({
    "photos":json_obj(true),
    "location-id":{
        type: ObjectId,
        required:true,
        ref:'location'
    }
});

var availabilitySchema = new Schema({
    "days":json_obj(true),
    "location-id":{
        type: ObjectId,
        required:true,
        ref:'location'
    }
});

var cancellationsSchema = new Schema({
    "option":number,
    "location-id":{
        type: ObjectId,
        required:true,
        ref:'location'
    }
});

var activityAmenitiesSchema = new Schema({
    "price":number,
    "activities":json_obj(true),
    "activities-extra":json_obj(),
    "amenities":json_obj(true),
    "amenities-extra":json_obj(),
    "amenities-others":json_obj(),
    "amenities-others-price":json_obj(),
    "location-id":{
        type: ObjectId,
        required:true,
        ref:'location'
    }
});

var profileSchema = new Schema({
    "profile-pic":String,
    "first-name":String,
    "last-name":String,
    "mobile":{
        type:Number,
        maxlength:10,
        minlength:10
    },
    "user-id":{
        type:ObjectId,
        required:true,
        ref:'user'
    }
});

var sourceSchema = new Schema({
    "source":json_obj(),
    "other-source":json_obj(),
    "user-id":{
        type:ObjectId,
        required:true,
        ref:'user'
    }
});

var paymentDetailsSchema = new Schema({
    "name":string,
    "account-number":number,
    "bank-name":string,
    "branch":string,
    "ifsc-code":string,
    "address":string,
    "user-id":{
        type:ObjectId,
        required:true,
        ref:'user'
    }
});

var blockSlotSchema = new Schema({
    "date":{
        type:Date,
        required:true
    },
    "time":json_obj(true),
    "location-id":{
        type: ObjectId,
        required:true,
        ref:'location'
    }
});

const Location = mongoose.model('location',locationSchema);
const About = mongoose.model('about',aboutSchema);
const Setup = mongoose.model('setup',setupSchema);
const Photos = mongoose.model('photo',photoSchema);
const Availability = mongoose.model('availability',availabilitySchema);
const Cancellations = mongoose.model('cancellation',cancellationsSchema);
const ActivityAmenities = mongoose.model('activityamenitie',activityAmenitiesSchema);
const Profile = mongoose.model('profile',profileSchema);
const Source = mongoose.model('source',sourceSchema);
const PaymentDetails = mongoose.model('paymentdetail',paymentDetailsSchema);
const BlockSlot = mongoose.model('blockslot',blockSlotSchema);

module.exports={Location,Setup,About,Photos,Availability,Cancellations,ActivityAmenities,Profile,Source,PaymentDetails,BlockSlot};