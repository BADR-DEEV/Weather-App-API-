const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended: true}));



app.use(express.static(__dirname + '/public'));


app.get("/", function(req , res){
res.sendFile(__dirname + "/ww.html");
});
app.post("/", function(req , res){

// const url = "https:/api.openweathermap.org/data/2.5/weather?q=London&appid=95f1efb8f76610c7d86a386fbbcbdd15&units=metric"
const query = req.body.cityName

const apiKey = "95f1efb8f76610c7d86a386fbbcbdd15" 

const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=" + apiKey + "&units=metric";

	https.get(url, function(response){

response.on("data", function(data){
const weather = JSON.parse(data);
const temp = weather.main.temp;
 const des = weather.weather[0].description;
 const icon = weather.weather[0].icon;
const img = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
res.write("<h1>the temperature in "+ query +" is " + temp + " degress in celcius</h1>");
res.write("<p>The description is " + des + " </p>");
res.write("<img src="+img+">");
res.send();
  });

 });
})



app.listen(3000 , function(){

	console.log("server is running");
})