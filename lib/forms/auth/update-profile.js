var form_data={
    "form-msg":{
        "success":""
    },
    "fields":{
        "profile-pic":"Profile Picture",
        "first-name":"First Name",
        "last-name":"Last Name",
        "about":"About",
        "address":"Currently residing in",
        "mobile":"Mobile number",
        "birthday":"Birthday",
        "aadhar-number":"Aadhar ID Number",
        "aadhar-file":"Upload Aadhar jpeg here",
    },
    "field-type":{
        "profile-pic":{
            "attr":{
                "required":true,
                "accept":".jpg,.png,.jpeg",
                "type":"file",
            },
            "errors":"Please select an image file",
            "class":"col-12"
        },
        "first-name":{
            "attr":{
                "required":true,
                "pattern":"[a-zA-Z]{0,}"
            },
            "errors":"Please enter the First name",
            "class":"col-md-6"
        },
        "last-name":{
            "attr":{
                "required":true,
                "pattern":"[a-zA-Z]{0,}"
            },
            "errors":"Please enter the Last name",
            "class":"col-md-6"
        },
        "about":{
            "attr":{
                "rows":"4"
            },
            "type":"textarea"
        },
        "mobile":{
            "attr":{
                "required":true,
                "minLength":10,
                "maxLength":10,
                "pattern":"[0-9]{0,}"
            },
            "errors":["Please enter the Mobile number","Please enter a valid Mobile number"],
        },
        "birthday":{
            "attr":{
                "class":"dropdown-toggle",
                "readOnly":true
            }
        },
        "aadhar-number":{
            "attr":{
                "pattern":"[0-9]{12}"
            }
        },
        "aadhar-file":{
            "attr":{
                "required":true,
                "accept":".jpg,.png,.jpeg",
                "type":"file",
            },
            "errors":"Please select an image file",
            "class":"col-12"
        }
        
    }
};

module.exports={form_data};