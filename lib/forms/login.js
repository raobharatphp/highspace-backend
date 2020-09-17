var form_data={
    "form-title":"Login",
    "btn-label":"Log in",
    "form-msg":{
        "success":""
    },
    "fields":{
        "email":"Email ID",
        "password":"Password",
        "remember-me":"Remember Me",
    },
    "field-type":{
        "email":{
            "attr":{
                "required":true,
                "type":"email"
            },
            "errors":["Please enter your Email address","Please enter a valid Email address"],
            "class":"col-12"
        },
        "password":{
            "attr":{
                "type":"password",
                "minLength":5,
                "required":true
            },
            "errors":["Please enter the Password","Please enter minimum 5 digit length Password"],
            "class":"col-12"
        },
        "remember-me":{
            "attr":{
                "type":"checkbox",
            },
            "class":"col-12",
            "options":["Remember Me"]
        },
    }
};

module.exports={form_data};