import React from "react";
import { Card, Button } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

function RecipeCard(props) {
  const target = "/" + props.target;

  return (
    <Col lg="6" xl="4">
      <Card style={{ width: "100%", height: "98%", marginTop: "1rem" }}> {/* style can be removed if not preferred */}
        <Card.Img className="cardImg" variant="top" src={props.imageURL} style={{ width: "100%", height: "50%" }} /> {/*Image style can be removed if not preferred */}
        <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>{/* style can be removed if not preferred */}
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>{props.description}</Card.Text>
          <Link to={target}>
            <Button style={{ width: "100%" }} variant="outline-info">
              Recipe
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default RecipeCard;
