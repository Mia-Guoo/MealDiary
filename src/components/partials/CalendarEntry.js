import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from "react-router-dom";
import * as Icon from 'react-bootstrap-icons';




function CalendarEntry(props) {

    const target = "/" + props.RecipeID;

    function removeItem() {
        
        props.deleteItem(props._key)
    }

    return (
        <Card style={{ width: '100%' }}>
            
                <ListGroup variant="flush">
                
                    <ListGroup.Item>
                        <Link to={target}>
                            {props.RecipeName}
                        </Link>
                        <Icon.Backspace onClick={() => removeItem()} className="calendar-icons"></Icon.Backspace>
                    </ListGroup.Item>    
                </ListGroup>
        </Card>
    )
}

export default CalendarEntry;
