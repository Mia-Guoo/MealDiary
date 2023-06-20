import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import CalendarAdd from "./partials/CalendarAdd";
import * as Icon from "react-bootstrap-icons";

import CalendarAddPopup from "./partials/CalendarAddPopup";

function RecipeInstruction(props) {


  const navigate = useNavigate();
  const [buttonPopup, setButtonPopup] = useState(false);

  const openPopup = () => {
    setButtonPopup(true);
  };

  const closePopup = () => {
    setButtonPopup(false);
  };

  const [favorites, setFavorites] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [recipe, setRecipe] = React.useState({
    _id: "",
    Name: "",
    url: "",
    Description: "",
    Author: "",
    Ingredients: [],
    Method: [],
    Category: [],
    ImageURL: "",
    Serving: 0,
    Rating: 0,
    Calories: 0,
  });

  const [servings, setServings] = useState(recipe.Serving);

  function updateServings(event) {
    let newServing = event.target.value;
    console.log(servings);
    console.log(recipe.Serving);

    let servingRatio = newServing / recipe.Serving;

    setServings(newServing);
    updateIngredients(servingRatio);
  }

  const [dynamicIngredients, setIngredients] = useState([]);

  function updateIngredients(servingRatio) {
    setIngredients([]);

    console.log(servingRatio);

    recipe.Ingredients.forEach((element) => {
      setIngredients((prev) => {
        return [...prev, element[0] * servingRatio];
      });
    });

    // console.log(servingRatio);
    // console.log(dynamicIngredients);
  }

  let params = useParams();

  React.useEffect(() => {
    let recipeID = params.recipeId;

    let target = "/recipes/" + recipeID;
    console.log(target);

    axios.get(target).then((res) =>
      setRecipe(() => {
        return {
          Name: res.data.Name,
          url: res.data.url,
          Description: res.data.Description,
          Author: res.data.Author,
          Ingredients: res.data.Ingredients,
          Method: res.data.Method,
          Category: res.data.Category,
          ImageURL: res.data.ImageURL,
          Serving: res.data.Serving,
          Rating: res.data.Rating,
          Calories: res.data.Calories,
        };
      })
    );
  }, []);

  function addToGrocerylist(recipe) {
    const ingredientList = recipe.Ingredients;
    const groceryQuantity = dynamicIngredients;
    const newGroceryList = {
      ingredients: ingredientList,
      quantity: groceryQuantity,
    };
    const grocery = JSON.parse(localStorage.getItem("grocery")) || [];

    const allGroceryList = [...grocery, newGroceryList];
    localStorage.setItem("grocery", JSON.stringify(allGroceryList));
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2000);
    navigate("/grocery");
  }

  function addToFavorites(recipe) {
    let recipeID = params.recipeId;

    const recipeName = recipe.Name;
    const recipeId = recipeID;
    const newFavorite = { name: recipeName, id: recipeId };
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (!favorites.some((favorite) => favorite.name === recipeName)) {
      const newFavorites = [...favorites, newFavorite];
      setFavorites(newFavorites);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      console.log(recipeName);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 2000);
    } else {
      setShowMessage("Already added!");
      setTimeout(() => setShowMessage(false), 2000);
    }
  }

  return (
    <div className="mainContentBox">
      <Container>
        <Row>
          <Col sm={8}>
            <img src={recipe.ImageURL} width="100%"></img>
          </Col>
          <Col sm={4}>
            <h3>{recipe.Name}</h3>
            <p>{recipe.Description}</p>
          </Col>
        </Row>
        <Row>
          <Col lg={4}>
            <h4>Ingredients</h4>
            <label for="ServingInput">Servings</label>
            <input
              type="number"
              id="ServingInput"
              min="1"
              onChange={updateServings}
              value={servings}
            ></input>
            <ol>
              {recipe.Ingredients.map((item, index) => {
                return (
                  <li>
                    {dynamicIngredients[index]} {item[1]}
                    {item[2]}
                  </li>
                );
              })}
            </ol>
            <Button
              variant="outline-info"
              onClick={() => addToGrocerylist(recipe)}
              style={{ width: "50%", margin: "1rem" }}
            >
              Add to Grocery List
            </Button>
            {/* <Button onClick={() => addToFavorites(recipe)} style={{ width: "60%" }} variant="outline-info">Add to Favorites</Button>
              {showMessage && <p>Added!</p>} */}

              <Button 
                variant="outline-info"
                onClick={openPopup}
                style={{ width: "50%", margin: "1rem" }}>
                  Add to Calendar
              </Button>
            {buttonPopup && (
              <div className="popup" style={{margin: '0 auto', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '40%', background: 'white'}}>
                  <CalendarAddPopup recipeID={params.recipeId} recipeName={recipe.Name} close={closePopup} />
              </div>
            )}

            
          </Col>
          <Col lg={8}>
            <h4>Instructions</h4>
            <ol>
              {recipe.Method.map((step) => {
                return <li>{step}</li>;
              })}
            </ol>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default RecipeInstruction;
