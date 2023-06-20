import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card, } from "react-bootstrap";
import "./Popup.css"
import axios from "axios";

function Popup(props) {

  const userID = localStorage.getItem("userID")
  const [message, setMessage] = useState(false);


    // Using hardcoded dates as a part of testing / development
    // dynamically generated dates will be created as a part of a subsequent iteration
    const [daySelection, setDaySelection] = useState([
        {id: "2023-04-16T00:00:00.000Z", status: false},
        {id: "2023-04-17T00:00:00.000Z", status: false},
        {id: "2023-04-18T00:00:00.000Z", status: false},
        {id: "2023-04-19T00:00:00.000Z", status: false},
        {id: "2023-04-20T00:00:00.000Z", status: false},
        {id: "2023-04-21T00:00:00.000Z", status: false},
        {id: "2023-04-22T00:00:00.000Z", status: false}
    ])

    const [mealSelection, setMealSelection] = useState([
        {id: "breakfast", status: false},
        {id: "lunch", status: false},
        {id: "dinner", status: false},
        {id: "snack", status: false},
    ])

    function toggleDaySelection(event) {
        const {name, value} = event.target;

        setDaySelection( (prev) => {
            return prev.map((day) => {
                if (day.id === value) {
                    return {...day, status: !day.status}
                } else {
                    return day
                }
            })
        })
    }

    function toggleMealTypeSelection(event) {
        const {name, value} = event.target;

        setMealSelection( (prev) => {
            return prev.map((meal) => {
                if (meal.id === value) {
                    return {...meal, status: !meal.status}
                } else {
                    return meal
                }
            })
        })
    }

    function addToCalendar() {

        console.log(props);

        daySelection.forEach( (day) => {
            if (day.status === true) {
                mealSelection.forEach( (meal) => {
                    if (meal.status === true) {
                        axios.post("/addCalendar" , {
                            userID: userID,
                            date: day.id,
                            recipeID: props.recipeID,
                            recipeName: props.recipeName,
                            type: meal.id
                        })
                    }
                })
            }
        })

        props.close();
    }

    return (
        <Container>
            <Card className="mb-5 mt-5">
            <h3>Select the days to add:</h3>
            {daySelection.map( (day) => {
                return (
                    <div>
                        <input class="form-check-input" type="checkbox" value={day.id} id={day.id} onChange={toggleDaySelection} /> {day.id.substring(0,10)} <br/>
                    </div>
                    )
            })}
            </Card>
            <Card className="mb-5 mt-5">
            <h3>Select the meal types:</h3>
            {mealSelection.map( (meal) => {
                return (
                    <div>
                        <input class="form-check-input" type="checkbox" value={meal.id} id={meal.id} onChange={toggleMealTypeSelection} /> {meal.id} <br/>
                    </div>
                    )
            })}
            </Card>
            <Row className="justify-content-center">
                <Col xs={5}>
                    <Button style={{width: '100%'}} className="m-2" onClick={addToCalendar} variant="outline-info">Add to Calendar</Button>
                </Col>
                <Col xs={5}>
                    <Button style={{width: '100%'}} className="m-2" onClick={props.close} variant="outline-info">Close</Button>
                </Col>
            </Row>

        </Container>
    )

}

export default Popup;