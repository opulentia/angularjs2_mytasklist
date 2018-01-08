const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config =  require("../config/database");
const User = require("../models/user"); // bring in User model

// Register
router.post("/register", (req, res, next) => {
    let newUser = new User({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    });
    User.addUser(newUser, (err, user) => {
        if (err) {
          res.json({success: false, msg:"Failed to register user"});
        } else {
          res.json({true: true, msg:"User registered"});
        }
    });
});

// Authenticate
router.post("/authenticate", (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    User.getUserByUsername(username, (err, user) => {

        console.log(username  + " <<  username ");

        if(err) throw err;
        if(!user){
          return res.json({
              success: false,
              msg: "User not found"
          });
        }

        User.comparePassword(password, user.password, (err, isMatch) => {

          console.log(password  + " <<  password " + user.password + " << user.password ");

          if(err) throw err;

          console.log("no error");

          if(isMatch) {

            console.log("isMatch = true");

            const token = jwt.sign(JSON.stringify(user), config.secret);
            // TODO : expresIn opotion needs to be set

            console.log("token" + JSON.stringify(token));

            res.json({
              success: true,
              token: "JWT " + token,
              user: {
                id: user._id,
                name: user.name,
                username: user.username,
                email: user.email
              }
            });
          } else {

            console.log("isMatch = false");

            return res.json({success: false, msg:"Wrong password."});
          }
        });
    });
});

// Profile
router.get("/profile", passport.authenticate("jwt",{session:false}),(req, res, next) => {
    res.json({user: req.user});
})
// session: false -> we are not using session, so set it false

// Validate
router.get("/validate", (req, res, next) => {
    res.send("VALIDATE");
});

module.exports = router;
