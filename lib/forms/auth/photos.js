var form_data={
    "form-title":"Photos",
    "btn-label":"Save & Continue",
    "form-msg":{
        "success":""
    },
    "fields":{
        "photos":"Photos",
    },
    "field-type":{
        "photos":{
            "attr":{
                "required":true,
                "accept":".jpg,.png,.jpeg",
                "type":"file",
                "multiple":true
            },
            "errors":"Please select an image file",
            "class":"col-12"
        }
    }
};

module.exports={form_data};