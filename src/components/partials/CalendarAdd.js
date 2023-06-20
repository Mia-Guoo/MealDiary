import React, { useState } from "react";
import axios from "axios";
import * as Icon from 'react-bootstrap-icons';
import { Row, Col, Card } from "react-bootstrap";
import { Button } from "react-bootstrap";



function CalendarAdd(props) {

    const date = "2023-01-02";
    const recipeID = props.recipeID;
    const recipeName = props.recipeName;
    const type = "Dinner";
    const user = localStorage.getItem("userID");

    const [message, setMessage] = useState(false);


    function addToCalendar() {

        axios.post("/addCalendar" , {
            userID: user,
            date: date,
            recipeID: recipeID,
            recipeName: recipeName,
            type: type
        }).then( (res) => {
            if (res.status === 200) {
                setMessage(true);
            }
        });
    }

    return (
        <div>
            <Button onClick={() => addToCalendar()} style={{ width: "60%" }} variant="outline-info">Add to Calendar</Button>
            {message ? "success!" : ""}
        </div>
        
    )
    
}

export default CalendarAdd;