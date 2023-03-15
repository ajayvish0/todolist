const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));



app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res) {
  var firstname = req.body.fname;
  var lastname = req.body.lname;
  var email = req.body.useremail;

  var data = {
    members: [{

      email_address: email,

      status: "subscribed",
      merge_fields : {
        FNAME:firstname,
        LNAME:lastname
      }

    }]
  };
  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us18.api.mailchimp.com/3.0/lists/41a0b6de5a",
    method: "post", //posting data to mailchimp

    headers: {
      "authorization": "ajay 823ef6f36c81b5d3728af4b2e8e16b25-us18" //http authorization to api using node & request
    },
   body: jsonData // whenever user signup, then all jsonData is stored in their surver

  }

  request(options, function(error, response, body) {
    if (error  || response.statusCode!=200) {
      res.sendFile(__dirname+"/failure.html")
    } else {
      res.sendFile(__dirname+"/success.html");
    }
  })
})

app.post("/failure",(req,res)=>{
  res.redirect("/");
})



app.listen(process.env.PORT||3000, function() {
  console.log("server is running on port 3000");
})


// my first mailchimp api key
// 823ef6f36c81b5d3728af4b2e8e16b25-us18     01a479d892
