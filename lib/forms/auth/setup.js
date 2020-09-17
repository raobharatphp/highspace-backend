var form_data={
    "form-title":"Setup",
    "btn-label":"Save & Continue",
    "form-msg":{
        "success":""
    },
    "fields":{
        "floor-area":"Total Floor area (in sqft)",
        "multiple-floors":"Multiple Floors",
        "age-restriction":"Any age restrictions?",
        "guests-allowed":"Number of guests allowed at a time",
        "common-rules":"Common rules:",
        "other-rules":"Other rules",
    },
    "field-type":{
        "floor-area":{
            "attr":{
                "pattern":"[0-9]{0,}",
                "required":true,
                "placeholder":"Enter area in main floor"
            },
            // "errors":"",
            "class":"col-12"
        },
        "multiple-floors":{
            "attr":{
                "pattern":"[0-9]{0,}",
                "placeholder":"Floor 2 Area"
            },
            "errors":"",
            "class":"col-4"
        },
        "age-restriction":{
            "attr":{
                "placeholder":"Minimum age"
            },
            "errors":"Please enter minimum age",
            "class":"col-12"
        },
        "guests-allowed":{
            "attr":{
                "required":true,
                "pattern":"[0-9]{0,}",
                "placeholder":"Enter number"
            },
            // "errors":"",
            "class":"col-4"
        },
        "common-rules":{
            "attr":{
                "type":"checkbox"
            },
            "options":["Smoking is prohibited or a separate room for smoking.","Alcohol consumption is not allowed.","Do not slam the doors.","Throw out the leftover eateries in proper dustbins.","Maintain a healthy environment with coworkers."],
            // "errors":"",
            "class":"col-10",
        },
        "other-rules":{
            "attr":{
                "rows":3,
                "placeholder":"Enter other rules"
            },
            // "errors":"",
            "class":"col-10",
            "type":"textarea"
        },
    }
};

module.exports={form_data};