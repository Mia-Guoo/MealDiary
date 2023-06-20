import Recipe from "../../models/recipe.model.js";

export function AddRecipe(req, res, next) {
  const Name = req.body.Name;
  const url = req.body.url;
  const Description = req.body.Description;
  const Author = req.body.Author;
  const Ingredients = req.body.Ingredients;
  const Method = req.body.Method;
  const Category = req.body.Category;
  const ImageURL = req.body.ImageURL;
  const Serving = req.body.Serving;
  const Rating = req.body.Rating;
  const Calories = req.body.Calories;

  const newRecipe = new Recipe({
    Name,
    url,
    Description,
    Author,
    Ingredients,
    Method,
    Category,
    ImageURL,
    Serving,
    Rating,
    Calories,
  });

  newRecipe
    .save()
    .then(() => res.json("Recipe added!"))
    .catch((err) => res.status(400).json("Error: " + err));
}

export function GetRecipe(req, res) {
  let id = req.params.id;

  Recipe.findById(id).then((items) => res.json(items));
}

export function GetAllRecipes(req, res) {
  Recipe.find().then((items) => res.json(items));
}

export function GetSomeRecipes(req, res) {
  
  let skip = req.query.skip || 0;
  console.log(skip);
 
  Recipe.find({}, undefined, {skip, limit: 5}).sort('_id').then((items) => res.json(items));

}