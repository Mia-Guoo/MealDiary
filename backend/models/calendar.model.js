import mongoose from "mongoose";
const Schema = mongoose.Schema;

const calendarSchema = new Schema(
  {
    User:{
      type: String
    },
    MealName: {
      type: String,
    },
    mealDate: {
      type: String,
    },
    mealType: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Calendar = mongoose.model("Calendar", calendarSchema);
export default Calendar;
