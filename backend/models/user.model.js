import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
    },
    username: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    meals: {
      date: {type: Date},
      recipeID: {type: String},
      recipeName: {type: String},
      type: {type: String}
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
