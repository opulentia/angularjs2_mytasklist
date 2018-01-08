var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

var index = require("./routes/index");
var task = require("./routes/tasks");

var port = 3000;

var app = express();

// View Engine
app.set("views", path.join(__dirname, "views"));  // views will be under views folder
app.set("view engine", "ejs");                    // ejs for our view engine
app.engine("html", require("ejs").renderFile);    // telling the engine that extension html means it is a view file.

// Set Static folder() where we put all the angularjs files together.
app.use(express.static(path.join(__dirname,"client")));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Router

app.use("/", index);
app.use("/api", task);

app.listen(port, function () {
    console.log("server ready to go on port : " + port);
});
