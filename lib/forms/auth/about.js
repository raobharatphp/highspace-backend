var form_data={
    "form-title":"About",
    "btn-label":"Save & Continue",
    "form-msg":{
        "success":""
    },
    "fields":{
        "space-type":"Mention the type of space",
        "space-name":"Give your space a name",
        "description":"Add a description",
        "instruction":"Arrival Instructions (If any)",
    },
    "field-type":{
        "space-type":{
            "attr":{
                "required":true,
                "placeholder":""
            },
            "errors":"Please enter type of space",
            "class":"col-12"
        },
        "space-name":{
            "attr":{
                "required":true,
                "placeholder":""
            },
            "errors":"Please enter space name",
            "class":"col-12"
        },
        "description":{
            "attr":{
                "required":true,
                "rows":4,
                "placeholder":"Enter Description"
            },
            "errors":"Please enter the description",
            "class":"col-12",
            "type":"textarea"
        },
        "instruction":{
            "attr":{
                "rows":4,
                "placeholder":"Enter Description"
            },
            "errors":"Please enter the description",
            "class":"col-12",
            "type":"textarea"
        },
    }
};

module.exports={form_data};