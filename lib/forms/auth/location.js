var form_data={
    "form-title":"Location",
    "btn-label":"Save & Continue",
    "form-msg":{
        "success":""
    },
    "fields":{
        "address":"Enter your address",
        "latitude":"Latitude",
        "longitude":"Longitude",
        "landmark":"Add a nearby landmark",
        "street-name":"Enter street name",
        "state":"Enter state",
        "district":"Enter district",
        "zip-code":"Pin Code",
        "other":"Anything else ?",
    },
    "field-type":{
        "address":{
            "attr":{
                "required":true,
                "placeholder":""
            },
            "errors":"Please enter your address",
            "class":"col-12"
        },
        "latitude":{
            "attr":{
                "type":"hidden",
            },
        },
        "longitude":{
            "attr":{
                "type":"hidden",
            },
        },
        "landmark":{
            "attr":{
                "required":true,
                "placeholder":""
            },
            "errors":"Please enter nearby landmark",
            "class":"col-12"
        },
        "street-name":{
            "attr":{
                "required":true,
                "placeholder":""
            },
            "errors":"Please enter street name",
            "class":"col-8"
        },
        "state":{
            "attr":{
                "required":true,
                "placeholder":""
            },
            "errors":"Please enter state name",
            "class":"col-8"
        },
        "district":{
            "attr":{
                "required":true,
                "placeholder":""
            },
            "errors":"Please enter district name",
            "class":"col-8"
        },
        "zip-code":{
            "attr":{
                "required":true,
                "placeholder":"800001"
            },
            "errors":"Please enter pin code",
            "class":"col-4"
        },
        "other":{
            "attr":{
                "rows":4,
                "placeholder":""
            },
            "type":"textarea"
        },
    }
};

module.exports={form_data};