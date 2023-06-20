import express from "express";
import jwt from "jsonwebtoken";
import dotnev from "dotenv";
import User from "../../models/user.model.js";
import { redirect } from "react-router";

dotnev.config();

// Function to generate a JWT token 
function generateToken(user){
  const payload = { userId: user._id };
  const secret = process.env.JWT_SECRET;
  const options = { expiresIn: '1h' };
  return jwt.sign(payload, secret, options);
}

export function ProcessLoginPage(req, res, next) {
  const { username, password } = JSON.parse(req.body.body);

  User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Authentication failed",
        });
      }

      if (user.password === password) {
        // Generate token and include in the repsonse
        const token = generateToken(user);
        return res.status(200).json({
          message: "Authentication successful",
          token: token, 
          userID: user._id
        });
      } else {
        return res.status(401).json({
          message: "Authentication failed",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        error: err,
      });
    });

  
}

export function ProcessRegisterPage(req, res, next) {

  console.log(req.body);

  const newUser = new User({
    userId: req.body.userId,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });


  newUser
    .save()
    .then((doc) => res.json("User added!"))
    .catch((er) => res.status(400).json("Error: " + er));
}

export function ProcessLogoutPage(req, res, next) {
  // req.logOut(function (err) {
  //     if (err) {
  //         console.error(err);
  //         res.end(err)
  //     }
  //     console.log("User logged out successfully")
  // })
  console.log("User logged out successfully");
  // res.redirect('/login')
}
