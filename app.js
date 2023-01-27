const express= require("express");
const bodyparser= require("body-parser");
const request=require("request");
const https=require("https");
const stringify = require("fast-json-stable-stringify");
const { json } = require("body-parser");
const app = express();
app.use(express.static("public"))
app.use(bodyparser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})
app.post("/",function(req,res){
    fname=req.body.fn;
    lname=req.body.ln;
    eaddress=req.body.ea;
    console.log(fname);
    console.log(lname);
    console.log( eaddress);
    var data = {
        members:[
            {
                email_address:eaddress,
                status:"subscribed",
                merge_fields:{
                    FNAME:fname,
                    LNAME:lname
                }

            }
        ]
    };
    const jsondata=JSON.stringify(data);
    const url="https://us14.api.mailchimp.com/3.0/lists/34f235cf6d ";
    const options={
        method:"POST",
        auth:"surya:ad8e509361ff9c0881e3d18cef5c3d0be-us14"
    }
   const request= https.request(url,options,function(response){
    if(response.statusCode===200){
        res.sendFile(__dirname+"/success.html");   
    }
    else{
        res.sendFile(__dirname+"/failure.html");
    }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        });
        
    })
    

    request.write(jsondata);
    request.end();

})
app.post("/failure",function(req,res){
    res.redirect("/");
});



app.listen("3000",function(req,res){
    console.log("app listen in port 3000");
});













// d8e509361ff9c0881e3d18cef5c3d0be-us14


// 34f235cf6d  lst


// https://mailchimp.com/developer/marketing/guides/quick-start/#generate-your-api-key


// https://usx.api.mailchimp.com/3.0/lists