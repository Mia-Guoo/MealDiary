import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, } from "react-bootstrap";
import "./Popup.css"

function Popup(props) {
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
  const [dates, setDates] = useState([]);
  const [mealType, setMealType] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [weeklyCalendarData, setWeeklyCalendarData] = useState([]);
  const userID = localStorage.getItem("userID")

  const mealOptions = ["breakfast", "lunch", "dinner", "snack" ];

  useEffect(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - dayOfWeek);
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + (6 - dayOfWeek));
    const dates = [];
    for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
      dates.push(new Date(date));
    }
    setDates(dates);

    console.log(userID);
  }, []);

  function handleScheduled(event) {
    event.preventDefault();
    const mealTypeInputs = document.querySelectorAll('input[type="checkbox"][name="mealType"]:checked');
    const dateInputs = document.querySelectorAll('input[type="checkbox"][name="date"]:checked');
    const mealTypes = Array.from(mealTypeInputs).map((input) => input.value);
    const dates = Array.from(dateInputs).map((input) => new Date(input.value));

    console.log(mealType);
    console.log(selectedDates);
    
    const scheduledData = dates.map((date) => {
      const dayOfWeek = date.getDay();
      const weekIndex = Math.floor((date.getDate() - dayOfWeek + 10) / 7);
      const rowIndex = mealTypes.indexOf(props.favorites.type);
      return {
        weekIndex: weekIndex,
        dayOfWeek: dayOfWeek,
        rowIndex: rowIndex,
        recipeName: props.favorites.name,
      };
    });
    
    console.log(scheduledData);

    setWeeklyCalendarData((prevData) => {
      const newData = [...prevData];
      scheduledData.forEach((scheduled) => {
        const cellData = newData.find(
          (cell) =>
            cell.weekIndex === scheduled.weekIndex &&
            cell.dayOfWeek === scheduled.dayOfWeek &&
            cell.rowIndex === scheduled.rowIndex
        );
        if (cellData) {
          cellData.recipeName = scheduled.recipeName;
        }
      });
      return newData;
    });
  
    props.setTrigger(false);
  }
  

  return (props.trigger) ? (
    <div className='popup'>
        <div className='popup-inner'>
          <Container>
            <h3>Schedule {favorites.name} in Calendar</h3>
            <Row>
            <div class="form-check">
              <form>
                <Col sm={5}>
              <h5>Select Meal Type:</h5>
              {mealOptions.map( (meal) => {
                return (
                  <div>
                  <input class="form-check-input" type="checkbox" value={meal} id={meal+"check"} onChange={ (e) => {
                    if (e.target.checked) {
                      setMealType([...mealType, e.target.value])
                    } else {
                      setMealType(mealType.filter(type=> type !== e.target.value));
                    }
                  }}></input>
                <label class="form-check-label" >{meal}</label> <br />
                </div>

                )
              })}
              {/* <input class="form-check-input" type="checkbox" value="breakfast" id="breakfastCheck" onChange={(e) => {
                    if (e.target.checked) {
                      setMealType([...mealType, e.target.value])
                    } else {
                      setMealType(mealType.filter(type => type !== e.target.value))
                    }
                  }}/>
              <label class="form-check-label" for="breakfastCheck">Breakfast</label> <br />
              <input class="form-check-input" type="checkbox" value="lunch" id="lunchCheck" onChange={(e) => {
                    if (e.target.checked) {
                      setMealType([...mealType, e.target.value])
                    } else {
                      setMealType(mealType.filter(type => type !== e.target.value))
                    }
                  }}/>
              <label class="form-check-label" for="lunchCheck">Lunch</label><br />
              <input class="form-check-input" type="checkbox" value="dinner" id="dinnerCheck" onChange={(e) => {
                    if (e.target.checked) {
                      setMealType([...mealType, e.target.value])
                    } else {
                      setMealType(mealType.filter(type => type !== e.target.value))
                    }
                  }}/>
              <label class="form-check-label" for="dinnerCheck">Dinner</label><br />
              <input class="form-check-input" type="checkbox" value="snack" id="snackCheck" onChange={(e) => {
                    if (e.target.checked) {
                      setMealType([...mealType, e.target.value])
                    } else {
                      setMealType(mealType.filter(type => type !== e.target.value))
                    }
                  }}/>
              <label class="form-check-label" for="snackCheck">Snack</label><br /> */}
              </Col>
              <Col sm={5}>
              <h5>Select Meal Date:</h5>
              {dates.map((date) => (
                    <div key={date.getTime()}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={date.toISOString()}
                        id={`dateCheck${date.getTime()}`}
                      />
                      <label className="form-check-label" htmlFor={`dateCheck${date.getTime()}`}>
                        {date.toLocaleDateString()}
                      </label>
                      <br />
                    </div>
                  ))}
              </Col>
              </form>
            </div>
            </Row>
            <Button onClick={handleScheduled}>Send to Calendar</Button>
            <Button onClick={() => props.setTrigger(false)}>Close</Button>
            {props.children}
          </Container>
        </div>
    </div>
  ) : "";
}

export default Popup
