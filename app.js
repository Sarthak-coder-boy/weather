const exp = require("express");
const https = require("https");
const bodyparser = require("body-parser");

const app = exp();
app.use(bodyparser.urlencoded({extended:true}));

app.get("/", (req, res) => {
 res.sendFile(__dirname+"/index.html")   //   ---> to link html file we wanna use
   
})

app.post("/",(req,res)=>{              // ---> to get details from the form
const city = req.body.cityName;

const url =  "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=05bc1a15de0f265b4e36a29457a8fc6b&units=metric";

https.get(url, (respond) => {

  // console.log(respond.statusCode);

  respond.on("data",(data)=>{

      const wdata = JSON.parse(data);     //   ---> to get the data in the form of JSON

      const temp = wdata.main.temp;       //   ---> to get the temperature (use the objects & see their name from JSON indentation from API)
     
      const wdescription = wdata.weather[0].description;

      const icon = wdata.weather[0].icon;

      const imgUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";  //  ----> to add the currently weather based icon

      res.write("<p><h3>The Weather  in "+city+" is currently  "+wdescription+"</h3></p>");
      res.write("<h1>The temperature in "+city+" is "+temp+" degree celsius</h1>");
      res.write("<img src ="+imgUrl+" >")
      res.send();                  //   -------->  we can write multiple times but can send only once

  //     const object = {
  //         name : "Sarthak",
  //         age : 19 ,
  //         Hobby : "listening music"
  //     }

  //   console.log(JSON.stringify(object));       --->  To collapse the object

  })

})

//   res.send("Hello , server is working ");     ----> Only 1 Send can be written 

})


app.listen(3000, () => {
  console.log("Server started");
});
