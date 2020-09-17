var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    "profile-pic":String,
    "provider":{
        type:String,
        default:"highspace"
    },
    provider_id:String,
    "first-name":{
        type:String,
        required:true,
        pattern:"[0-9]{0,}"
    },
    "last-name":{
        type:String,
        required:true,
        pattern:"[0-9]{0,}"
    },
    email:{
        type:String,
        required:true,
        // unique:true
    },
    mobile:{
        type:Number,
        maxlength:10,
        minlength:10,
    },
    password:{
        type:String,
        required:true
    },
    others:{
        type:Object,
        default:{}
    },
    "is-vendor":{
        type:Boolean,
        default:false
    }
},{ timestamps: true});

const User = mongoose.model('user',userSchema);

module.exports={User};