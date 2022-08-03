const express= require("express");
const app= express();
const https= require("https");
const bodyParser= require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req, res){
    const latitude=req.body.latitude;
    const longitude=req.body.longitude;
    const apiKey= "fd98b7cf77ac55133c0fa5eeccd9ebf4";
    const url="https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&appid="+apiKey+"&units=metric";
    https.get(url, function(response){
        response.on("data", function(data){
            const weatherDataObject= JSON.parse(data);
            const temp= weatherDataObject.main.temp;
            const desc= weatherDataObject.weather[0].description;
            const city= weatherDataObject.name;
            const icn= weatherDataObject.weather[0].icon;
            const imgUrl="http://openweathermap.org/img/wn/"+icn+"@2x.png";
            res.write("<h1>The weather details of "+city+" city are:</h1>");
            res.write("<h2>The temperature is "+temp+" degree Celcius with "+desc+"</h2>");
            res.write("<img src="+imgUrl+">");
            res.send();
        });
    });


    
});

app.listen(3000, function(){
    console.log("Server is running at port 3000");
});