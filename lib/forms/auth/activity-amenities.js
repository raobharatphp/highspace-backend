var form_data={
    "form-title":"Payments & Amenities",
    "btn-label":"Save & Continue",
    "form-msg":{
        "success":""
    },
    "fields":{
        "price":"Enter base rental rate for your space (per hour)",
        "activities":"Select activities for you listing",
        "activities-extra":"",
        "amenities":"Select amenities provided by your listing",
        "amenities-extra":"",
        "amenities-others":"",
        "amenities-others-price":"",
    },
    "field-type":{
        "price":{
            "attr":{
                "required":true,
                "pattern":"[0-9]{0,}",
                "placeholder":"Enter rate"
            },
            "errors":"Please enter the price"
        },
        "activities":{
            "attr":{
                "type":"checkbox",
                "data-required":true
            },
            "errors":"Please select minimum 1 option",
            "options":["Meetings","Photostudio Space","Film Shoots","Yoga Space","Dance Activities","Workshops","Event Bookings","Media Productions",""],
        },
        "activities-extra":{
            "attr":{
            },
        },
        "amenities-extra":{
            "attr":{
            },
        },
        "amenities":{
            "attr":{
                "type":"checkbox",
                "data-required":3
            },
            "errors":"Please select minimum 3 options",
            "options":["Wifi","Parking Space","Green screen","Kitchen","Restrooms","Blackout blinds","Speakers","Stage","AV Technician","Roof with skylight","Others","Naural light","Lighting equipment","Props","Tables and chairs","Dressing room","Tarafa","Mics","Projector","Outdoor area","Cleaning services"],
        },
        "amenities-others":{
            "attr":{
                "placeholder":"Enter amentity"
            },
        },
        "amenities-others-price":{
            "attr":{
                "placeholder":"Price",
                "pattern":"[0-9]{0,}"
            },
        },
    }
};

module.exports={form_data};