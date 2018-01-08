const express = require("express");
const path = require("path"); // core module which has been installed by defualt,
const bodyParser = require("body-parser");
const cors = require("cors"); // by addig this, any domanin can reach this service.
const passport = require("passport");
const mongoose = require("mongoose");
const config = require("./config/database");

// Connect to Database
mongoose.connect(config.database);

// on connection
mongoose.connection.on("connected", () => {
    console.log("Connected to database " + config.database)
});

mongoose.connection.on("error", (err) => {
    console.log("Database error " + err)
});

const app = express();

const users = require("./routes/users");

//  Port number
const port = 4000;

//  CORS Middleware
app.use(cors()); // by addig this, any domanin can reach this service.

//  Set Static Folder
// __dirname : current directory
//  when reached the root request , for example localhost:3000, "index.html" file under public folder will be reached
app.use(express.static(path.join(__dirname, "public")));

// Body Parser Middlewre
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

app.use("/users",users);

// Index Route
app.get("/", (req, res) => {
    res.send("Invalid Endpoint");
});

// Start Server
app.listen(port,  () => {
    console.log("Server started on port " + port + " and babel enabled");
});

// How to run Node.js app with ES6 features enabled?

// {
//   "dependencies": {
//     "babel-cli": "^6.0.0",
//     "babel-preset-es2015": "^6.0.0"
//   },
//   "scripts": {
//     "start": "babel-node --presets es2015 app.js"
//   }
// }

// How to enable nodemon
// 1) type in "npm install -g nodemon"
// 2) then turn it on by typeing "nodemon"
