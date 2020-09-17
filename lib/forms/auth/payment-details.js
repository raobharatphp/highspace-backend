var form_data={
    "form-title":"Sign up",
    "btn-label":"Sign up",
    "form-msg":{
        "success":""
    },
    "fields":{
        "name":"Name of Account holder",
        "account-number":"Account number",
        "bank-name":"Name of bank",
        "branch":"Branch",
        "ifsc-code":"IFSC Code",
        "address":"Address",
    },
    "field-type":{
        "name":{
            "attr":{
                "required":true,
                "pattern":"[a-zA-Z\\s]{0,}"
            },
            "errors":"Please enter the Account holder name",
        },
        "account-number":{
            "attr":{
                "required":true,
                "pattern":"[0-9]{0,}",
                "minLength":9,
                "maxLength":18,
            },
            "errors":["Please enter the Account Number","Please enter a valid Account Number"]
        },
        "bank-name":{
            "attr":{
                "required":true,
            },
            "type":"select",
            "options":["Allahabad Bank","Andhra Bank","Axis Bank","Bank of Bahrain and Kuwait","Bank of Baroda - Corporate Banking","Bank of Baroda - Retail Banking","Bank of India","Bank of Maharashtra","Canara Bank","Central Bank of India","City Union Bank","Corporation Bank","Deutsche Bank","Development Credit Bank","Dhanlaxmi Bank","Federal Bank","ICICI Bank","IDBI Bank","Indian Bank","Indian Overseas Bank","IndusInd Bank","ING Vysya Bank","Jammu and Kashmir Bank","Karnataka Bank Ltd","Karur Vysya Bank","Kotak Bank","Laxmi Vilas Bank","Oriental Bank of Commerce","Punjab National Bank - Corporate Banking","Punjab National Bank - Retail Banking","Punjab & Sind Bank","Shamrao Vitthal Co-operative Bank","South Indian Bank","State Bank of Bikaner & Jaipur","State Bank of Hyderabad","State Bank of India","State Bank of Mysore","State Bank of Patiala","State Bank of Travancore","Syndicate Bank","Tamilnad Mercantile Bank Ltd.","UCO Bank","Union Bank of India","United Bank of India","Vijaya Bank","Yes Bank Ltd"]
        },
        "branch":{
            "attr":{
                "required":true,
            },
            "class":"col-md-6",
            "errors":"Please enter the bank branch name",
        },
        "ifsc-code":{
            "attr":{
                "required":true,
                "pattern":"[a-zA-Z]{4}0{1}[a-zA-Z0-9]{6}",
                "maxLength":"11",
                "minLength":"11",
                "data-transform":"uppercase"
            },
            "class":"col-md-6",
            "errors":"Please enter the bank IFSC code",
        },
        "address":{
            "attr":{
                "required":true,
                "rows":3
            },
            "type":"textarea",
            "errors":"Please enter the address",
        },
    }
};

module.exports={form_data};