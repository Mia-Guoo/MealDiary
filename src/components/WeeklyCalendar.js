import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, } from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';
import axios from "axios";
import Popup from "./partials/Popup.js";


const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack"];

    

function WeeklyCalendar() {
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
    const [currentWeek, setCurrentWeek] = useState(new Date());
    const [buttonPopup, setButtonPopup] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites'));
        console.log(favorites);
        if (favorites) {
            setFavorites(favorites);
           }

      }, []);

      const renderCalendar = () => {
        const startDate = new Date(currentWeek);
        startDate.setDate(startDate.getDate() - startDate.getDay());
      
        const days = [];
        for (let i = 0; i < 7; i++) {
          const date = new Date(startDate);
          date.setDate(startDate.getDate() + i);
          days.push(date);
        }
      
        const rows = mealTypes.map((mealType) => {
          const cells = days.map((day) => {
            const meal = " ";
            const scheduledRecipe = JSON.parse(localStorage.getItem(day.toDateString() + " " + mealType));
            return (
              <td key={day}>
                <div className="meal">
                  {scheduledRecipe ? scheduledRecipe.name : meal}
                </div>
              </td>
            );
          });
      
          return (
            <tr key={mealType}>
              <th>{mealType}</th>
              {cells}
            </tr>
          );
        });
      
        const headerCells = days.map((day) => (
          <th key={day}>{weekDays[day.getDay()]}, {day.getDate()}</th>
        ));
      
        return (
          <table className="calendar">
            <thead>
              <tr>
                <th></th>
                {headerCells}
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        );
      };
      

  const renderFavorites = () => {
    if (!favorites) {
      return null;
    }
  
    const handleRemove = (index) => {
        const newFavorites = favorites.filter((favorite, i) => i !== index);
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
        setFavorites(newFavorites);
      };
      
      const handleGoToRecipe = (recipeID) => {
            if (recipeID) {
              console.log(recipeID)
              navigate("/" + recipeID);
            }
      };
    

    return (
      <div className="favorites">
        <h3>Favorites</h3>
        {favorites.map((favorite, index) => {
          if (!favorite) {
            return null;
          }
          return (
            <div key={favorite.name} className="col">
              <div className="card h-100">
                <div className="card-body">
                  <p className="card-title">{favorite.name}</p>
                  <Icon.XLg onClick={() => handleRemove(index)} className="calendar-icons"></Icon.XLg>
                  <Icon.Calendar onClick={() => setButtonPopup(true)} className="calendar-icons"></Icon.Calendar>
                  <Icon.Backspace onClick={() => handleGoToRecipe(favorite.id)} className="calendar-icons"></Icon.Backspace>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="mainContentBox">
      <Container>
        <h1>This Week's Eats</h1>
        <Row>
        <Col sm={3}>
        {renderFavorites()}
        </Col>
        <Col>
        {renderCalendar()}
        </Col>
        </Row>
      </Container>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
      </Popup>
    </div>
  );
}

export default WeeklyCalendar;
