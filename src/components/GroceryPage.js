import React, { Fragment, useState, useEffect } from "react";

import Table from "react-bootstrap/Table";
import { useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Container, Row, Col } from "react-bootstrap";




//Mia's draft code
function GroceryListPopulate(props) {
  const [grocery, setGrocery] = useState(
    JSON.parse(localStorage.getItem("grocery")) || []
  );

  useEffect(() => {
    const grocery = JSON.parse(localStorage.getItem("grocery"));
    console.log(grocery);
    if (grocery) {
      setGrocery(grocery);
    }
  }, []);


  // Add button functionality 
  const addIngredients = (ingredientName, quantity, uom) => {
    const newIngredients = {
      ingredients: [[ingredientName, uom]],
      quantity: [quantity]


    };
    //sends the new ingredient to the grocery array
    setGrocery([...grocery, newIngredients]);
    /* then stores in the local storage so when navigating to another page,
     the list will remain with the newly added ingredient */

    localStorage.setItem("grocery", JSON.stringify([...grocery, newIngredients]));
    console.log(newIngredients, "new ingredients")
  };


  const AddIngredHandler = () => {
    const ingredientName = document.getElementsByName("name")[0].value;
    const quantity = document.getElementsByName("qty")[0].value;
    const uom = document.getElementsByName("uom")[0].value;
    addIngredients(ingredientName, quantity, uom);
    // clears the form fields after adding the new ingredient
    document.getElementsByName("name")[0].value = "";
    document.getElementsByName("qty")[0].value = "";
    document.getElementsByName("uom")[0].value = "";
  }




  //delete button functionality 
  const deleteIngredient = (index, sub) => {
    // create a new array to hold a copy of the grocery array
    const newGrocery = [...grocery];

    //removes the ingredient from the grocery array using the splice method at the index
    // and the sub is the index of the ingredient to be removed
    // this is done for both ingredients and quantity
    newGrocery[index].ingredients.splice(sub, 1);
    newGrocery[index].quantity.splice(sub, 1);
    setGrocery(newGrocery);
    console.log(newGrocery, "new grocery");
    localStorage.setItem("grocery", JSON.stringify([...grocery, newGrocery]));

  }

  function Clearlocalstorage() {
    localStorage.clear("grocery");
  }

  //hooks for editing and saving ingredients
  const [editIngredient, setEditIngredient] = useState(false);
  const [ingredIndex, setIngredIndex] = useState(null);
  const [ingredSub, setIngredSub] = useState(null);
  const [editQty, setEditQty] = useState('');
  const [editUom, setEditUom] = useState('');
  const [groceryName, setGroceryName] = useState('');

  // Edit button functionality 
  const EditIngredient = (index, sub, name) => {
    setEditIngredient(true);
    setIngredIndex(index);
    setIngredSub(sub);
    // editing the quantity of an ingrediet at a specific index  and the uom of the ingredient
    setEditQty(grocery[index].quantity[sub]);
    setEditUom(grocery[index].ingredients[sub][1]);
    setGroceryName(grocery[index].name);

    console.log(groceryName, "grocery name");

  }

  //save functionality 

  const saveIngredientEdit = () => {
    const newIngredients = [...grocery];
    newIngredients[ingredIndex].quantity[ingredSub] = editQty;
    newIngredients[ingredIndex].ingredients[ingredSub][1] = editUom;
    setGrocery(newIngredients);

    setEditIngredient(false);
    localStorage.setItem("grocery", JSON.stringify(newIngredients));



  }

  // cancel the edit operation
  const cancelEditOperation = () => {
    setEditIngredient(false);
    setIngredIndex(null);
    setIngredSub(null);
    setEditQty('');
    setEditUom('');
    setGroceryName('');

  }
  //
  return (
    <div className="groceryTable">
      <h2 className="groceryTitle">Grocery List</h2>
      <br />

      <Table striped>
        <thead>
          <tr>
            <th>Ingredient Name</th>
            <th>Quantity</th>
            <th>UOM</th>
            <th>Operations</th>
          </tr>
        </thead>

        <tbody>
          {grocery && grocery.map((i, index) => {
            return (

              /*used the React.Fragment key={index} 
              to assign elements of the array to individual 
              rows as it was causing errors with the delete button 
              **** side note ***** the fragment shortens the previous code !
              */
              <React.Fragment key={index}>
                {i.ingredients && i.ingredients.map((x, sub) => {
                  return (
                    <tr key={sub}>

                      {/* allows for the name and the quantity and uom  to appear in the table

                      With out the ||x[0]  only the quantity and uom are displayed for newly added ingredients 
                      
                      */}
                      <td>{x[2] || x[0]}</td>
                      <td>{i.quantity && i.quantity[sub]}</td>
                      <td>{x[1]}</td>
                      <td>
                        <button type=" button" className="btn btn-outline-primary" onClick={() => EditIngredient(index, sub, i.name)}>Edit</button>
                        <button type="button" className="btn btn-outline-danger " onClick={() => deleteIngredient(index, sub)} >Delete</button>
                      </td>
                    </tr>
                  );
                })}

                {editIngredient && ingredIndex === index && (
                  <div>

                    <label style={{ marginLeft: "10px" }}><strong>QTY:</strong></label>
                    <input

                      style={{ marginLeft: "10px" }}
                      type="number"
                      min={1}
                      value={editQty}
                      onChange={(e) => setEditQty(e.target.value)}
                    />

                    <label style={{ marginLeft: "10px" }}><strong>UOM:</strong></label>
                    <input

                      style={{ marginLeft: "10px" }}
                      type="text"
                      value={editUom}
                      onChange={(e) => setEditUom(e.target.value)}
                    />
                    < button type="button" className="btn btn-success" onClick={saveIngredientEdit}>Save</button>
                    <button type="button" className="btn btn-outline-secondary" onClick={cancelEditOperation}>Cancel</button>
                  </div>
                )}


              </React.Fragment>
            );

          })}

          {/* Displays two new input fields Quantity and UOM for editing 
            followed by a save button  that saves the changes to the grocery list to local storage 
           */}

        </tbody>


        <tr>
          <td>
            <input type="text" name="name"></input>
          </td>
          <td>
            <input type="number" name="qty"></input>
          </td>
          <td>
            <input type="text" name="uom"></input>
          </td>
          <td>
            <Button variant="outline-secondary" onClick={AddIngredHandler}>
              Add
            </Button>
            <button onClick={Clearlocalstorage}>Clear List </button>
          </td>
        </tr>


      </Table>
    </div>
  );
}

export default GroceryListPopulate;
