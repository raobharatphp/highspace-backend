var form_data={
    "form-title":"Sign up",
    "btn-label":"Sign up",
    "form-msg":{
        "success":""
    },
    "fields":{
        "first-name":"First Name",
        "last-name":"Last Name",
        "email":"Email ID",
        "mobile":"Mobile Number",
        "password":"Password",
        "confirm-password":"Confirm Password",
    },
    "field-type":{
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
        "email":{
            "attr":{
                "required":true,
                "type":"email"
            },
            "errors":["Please enter your Email address","Please enter a valid Email address"],
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
        "password":{
            "attr":{
                "type":"password",
                "required":true,
                "minLength":5,
            },
            "errors":["Please enter the Password","Please enter minimum 5 digit length Password"],
        },
        "confirm-password":{
            "attr":{
                "type":"password",
                "data-target":"password"
            },
            "errors":"Confirm Password does not match with Password",
        },
    }
};

module.exports={form_data};