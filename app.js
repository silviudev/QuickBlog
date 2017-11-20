//Require our dependencies
var express    = require("express"),
    mongoose   = require("mongoose"),
    bodyParser = require("body-parser");

var app = express();
app.use(express.static(__dirname + "/public"));

//Set view engine to ejs, to serve templates from views directory
app.set("view engine", "ejs");


//Get and use our routes
var indexRoutes = require("./routes/index");
var blogPostRoutes = require("./routes/posts");

app.use(indexRoutes);
app.use("/posts", blogPostRoutes);


//Connect to database
mongoose.connect("mongodb://localhost/quickblog", {useMongoClient: true});
mongoose.Promise = global.Promise;

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("QuickBlog server started");
})