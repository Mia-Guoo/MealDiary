import React from "react";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";
import RecipeCard from "./partials/RecipeCard.js";
import SearchBar from "./partials/SearchBar.js";
import InfiniteScroll from "react-infinite-scroll-component";
import SideBar from "./partials/Sidebar.js";
import CalendarEntry from "./partials/CalendarEntry.js";
import CalendarAdd from "./partials/CalendarAdd.js";
import CalendarAddPopup from "./partials/CalendarAddPopup.js"

function CalendarTestPage() {
    const [day, setDay] = React.useState([])
    // Using hardcoded dates as a part of testing / development
    const weekdays = [
        "2023-04-16T00:00:00.000Z",
        "2023-04-17T00:00:00.000Z",
        "2023-04-18T00:00:00.000Z",
        "2023-04-19T00:00:00.000Z",
        "2023-04-20T00:00:00.000Z",
        "2023-04-21T00:00:00.000Z",
        "2023-04-22T00:00:00.000Z"
    ]

    function updateDay(meal) {
        setDay( (prev) => {
            return [...prev, meal]
        })
    }

    function removeItem(id) {
        setDay( (prev) => {
            return prev.filter( (recipe, index) => {
                return index !== id;
            })
        })
    }

    function saveChanges() {
        axios.post("/CalendarUpdate", {
            userID: localStorage.getItem("userID"),
            meals: day
        })

    }

    React.useEffect(() => {
        let userID = localStorage.getItem("userID");

        let target = "/getCalendar?userID=" + userID;

        axios.get(target).then((res) => {

            res.data.forEach( (recipe) => {
                updateDay(recipe);
            })
        })
        console.log(day);
    }, []);

    return (
        <div className="mainContentBox">

            <Container>
            <Row>
                {weekdays.map ( (weekday) => {

                    return <Col sm="3">
                    {weekday.substring(0,10)}
                    {day.map( (recipe, index) => {
                        if (recipe.date === weekday) {
                            return <CalendarEntry RecipeID={recipe.recipeID} RecipeName={recipe.recipeName} key={index} deleteItem={removeItem} _key={index}/>
                        }
                    })}
                    </Col>
                })}

            </Row>     
            <Row>
                <Button onClick={saveChanges}>Save Calendar edits</Button>
            </Row>
            </Container>
        
        </div>
        )
    }

    export default CalendarTestPage;