import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Header from "./components/partials/Header";
import Footer from "./components/partials/Footer";
import HomePage from "./components/HomePage";
import Register from "./components/Register";
import Login from "./components/LoginPage";
import RecipePage from "./components/RecipePage";
import RecipeInstructions from "./components/RecipeInstructions";
import WeeklyCalendarPage from "./components/WeeklyCalendar";
import GroceryPage from "./components/GroceryPage";
import CalendarTestPage from "./components/CalendarTest";

import "./App.css";

function App() {


  return (
    <div className="bigBox">
      <Header></Header>
      <Router>
        <Routes>
          <Route exact path="/" element={<Navigate to="/home" />} />
          <Route exact path="/home" element={<HomePage />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route path="/recipes" element={<RecipePage />} />
          <Route path="/:recipeId" element={<RecipeInstructions  />} />
          <Route path="/calendar" element={<CalendarTestPage  />} />
          <Route path="/grocery" element={<GroceryPage />} />
          {/* <Route path="/testing" element={<CalendarTestPage />} /> */}
        </Routes>
      </Router>
      <Footer></Footer>
    </div>
  );
}
export default App;
