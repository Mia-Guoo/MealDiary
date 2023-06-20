// Test home page, can be deleted
import React, { useState } from "react";

import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import RecipeCard from "./partials/RecipeCard.js";
import SearchBar from "./partials/SearchBar.js";
import InfiniteScroll from "react-infinite-scroll-component";
import Collapsible from "./partials/Collapsible.js";

function HomePage() {
  // reuse of jasons's cards for home page for search bar
  const [recipeList, setRecipeList] = React.useState([]);
  const [searchResults, setSearchResults] = React.useState("");
  const [hasMore, setHasMore] = React.useState(true);
  const [filter, setFilter] = React.useState([]);
  const [activeFilter, setActiveFilter] = React.useState("All");


  React.useEffect(() => {
    // axios.get("/allRecipes").then((res) => {
    //   console.log(res.data);
    //   setRecipeList(res.data);
    // });
    fetchRecipes();
  }, []);


  //  fetch recipes for infinite scroll
  const fetchRecipes = () => {

    let target = '/someRecipes?skip=' + recipeList.length;


    axios.post(target)
      .then((res) => {
        if (res.data.length === 0) {
          // used a spread to make a copy of the array of recipes if the res.data is less than or equal to 20 items there are no more recipes to retrieve which will end the infinte scroll.
          //setRecipeList([...recipeList, ...res.data]);

          // set hasMore to false will stop infinite scroll
          setHasMore(false);

        } else {
          // if the res.data is greater than or equal to 20 items there are more recipes to retrieve 
          // I believe this is where the infinite scroll is causing duplicate recipes.
          setRecipeList([...recipeList, ...res.data]);

          setFilter([...recipeList, ...res.data]);
        }

      })
      .catch((err) => console.log(err));
  };



  return (
    <div className="mainContentBox">

      <SearchBar handleChange={(e) => setSearchResults(e.target.value)} />

      <div className="sideBarBox">
        <Collapsible recipeList={recipeList} setFilter={setFilter} activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

      </div>


      <div className="recipes">
        <Container>
          <InfiniteScroll
            dataLength={recipeList.length}
            hasMore={hasMore}
            next={fetchRecipes}
            loader={<h1>Loading...</h1>}
            endMessage={<h1>End of Recipes</h1>}

          >

            <Row>
              {/*currently working on a fix for the filter / search bar issue, as it cannot map both recipelist and filter at the same time */}
              {filter
                .filter((item) => {
                  if (searchResults === "") {
                    return item;
                  } else if (
                    item.Name.toLowerCase().includes(searchResults.toLowerCase())
                  ) {
                    return item;
                  }
                })
                .map((item) => {
                  return (
                    <RecipeCard
                      name={item.Name}
                      description={item.Description}
                      target={item._id}
                      imageURL={item.ImageURL}
                      key={item._id}
                    />
                  );
                })}
            </Row>
          </InfiniteScroll>
        </Container>
      </div>
    </div>
  );
}
export default HomePage;
