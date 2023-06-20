import mongoose from "mongoose";
const Schema = mongoose.Schema;

const recipeSchema = new Schema(
  {
    Name: {
      type: String,
    },
    url: {
      type: String,
    },
    Description: {
      type: String,
    },
    Author: {
      type: String,
    },
    Ingredients: {
      Quantity: Number,
      Uom: String,
      Name: String,
    },
    Method: {
      type: Array,
    },
    Category: {
      type: Array,
    },
    ImageURL: {
      type: String,
    },
    Serving: {
      type: Number,
    },
    Rating: {
      type: Number,
    },
    Calories: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Recipe = mongoose.model("Recipe", recipeSchema);
export default Recipe;
