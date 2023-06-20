import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import cors from "cors";
import mongodb from "mongodb";
import mongoose from "mongoose";
import dotenv from "dotenv";
import {
  ProcessLoginPage,
  ProcessLogoutPage,
  ProcessRegisterPage,
} from "./api/controllers/auth.controller.js";
import {
  GetAllRecipes,
  GetRecipe,
  GetSomeRecipes,
} from "./api/controllers/recipes.controller.js";
import {
  CalendarAdd,
  CalendarGet,
  CalendarUpdate,
  ProcessFavorites
} from "./api/controllers/calendar.controller.js";
import User from "./models/user.model.js";

dotenv.config();

// Make the server
const app = express();
const MongoClient = mongodb.MongoClient;
const port = process.env.PORT || 8000;

// set up the user session 
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

//api end point
app.get("/api", (req, res) => {
  res.json({ message: "Hello from backend server!" });
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.post("/register", ProcessRegisterPage);
app.post("/login", ProcessLoginPage);
app.post("/logout", ProcessLogoutPage);

app.get("/recipes/:id", GetRecipe);
app.get("/allRecipes", GetAllRecipes);
//app.get("/someRecipes", GetSomeRecipes)
app.post("/someRecipes", GetSomeRecipes);
app.post("/addCalendar", CalendarAdd);
app.get("/getCalendar", CalendarGet)
app.post("/CalendarUpdate", CalendarUpdate)

//app.post("/recipes/:id/favorites", ProcessFavorites);


// get driver connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.listen(port, () => {
  // perform a database connection when server starts
  console.log(`Server is running on port: ${port}`);
});

export default app;
