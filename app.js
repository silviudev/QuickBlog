//Require our dependencies
var express    = require("express"),
    mongoose   = require("mongoose"),
    bodyParser = require("body-parser");

var app = express();

//Set view engine to ejs, to serve templates from views directory
app.set("view engine", "ejs");


//Get and use our routes
var indexRoutes = require("./routes/index");


app.use(indexRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("QuickBlog server started");
})