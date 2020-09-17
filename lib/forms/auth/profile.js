var form_data={
    "form-title":"Profile",
    "btn-label":"Save & Continue",
    "form-msg":{
        "success":""
    },
    "fields":{
        "profile-id":"",
        "profile-pic":"",
        "first-name":"",
        "last-name":"",
        "mobile":"",
        "source":"How did you find out about us:",
        "other-source":""
    },
    "field-type":{
        "profile-id":{
            "attr":{
                "data-required":true
            }
        },
        "profile-pic":{
            "attr":{
                "required":true,
                "accept":".jpg,.png,.jpeg",
                "type":"file"
            },
            "errors":"Please select an image file",
            "class":"col-12"
        },
        "first-name":{
            "attr":{
                "required":true,
                "pattern":"[a-zA-Z]{0,}",
                "placeholder":"First name"
            },
            "errors":"Please enter the First name",
            "class":"col-md-6"
        },
        "last-name":{
            "attr":{
                "required":true,
                "pattern":"[a-zA-Z]{0,}",
                "placeholder":"Last name"
            },
            "errors":"Please enter the Last name",
            "class":"col-md-6"
        },
        "mobile":{
            "attr":{
                "required":true,
                "minLength":10,
                "maxLength":10,
                "pattern":"[0-9]{0,}",
                "placeholder":"XXXXX XXXXX"
            },
            "errors":["Please enter the Mobile number","Please enter a valid Mobile number"],
        },
        "source":{
            "attr":{
                "type":"checkbox"
            },
            "options":["Online Search","Social Media","Via blog post or an article","Advertisements","Event by Highspace","Television","Email","Billboard","Friends and family","Other"]
        },
        "other-source":{
            "attr":{
                "rows":1,
                "placeholder":"Other Source"
            },
            "type":"textarea"
        },
        
    }
};

module.exports={form_data};