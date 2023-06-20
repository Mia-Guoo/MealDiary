import Calendar from "../../models/calendar.model.js";
import User from "../../models/user.model.js";


export function ProcessFavorites(req, res, next) {
    
    const {  MealName, mealDate, mealType } = req.body;
   

    const newFavorite = new Calendar({

        MealName: MealName,
        mealDate: mealDate,
        mealType: mealType,
    })

    console.log("newFavorite", newFavorite);

    newFavorite
        .save()
        .then((doc) => res.json("Favorite added!"))
        .catch((err) => res.status(400).json("Error: " + err));
}

export function CalendarAdd(req, res, next) {
    const {userID, date, recipeID, type, recipeName} = (req.body);

    User.updateOne(
        {_id: userID},
        {$push: {meals: {
            recipeID: recipeID,
            recipeName: recipeName,
            date: date,
            type: type

        }}}
    ).catch((err) => {
        console.log(err);
        return res.status(500).json({
            error: err,
        })
    })

    return res.status(200).json({
        message: "Success!"
    })
}

export function CalendarGet(req, res, next) {
    const {userID, date} = req.query;

    User.findById(userID).then( (user) => {

        res.json(user.meals)
    })
}

export function CalendarUpdate(req, res, next) {
    const {userID, meals} = req.body;

    User.updateOne(
        {_id: userID},
        {meals: meals}).catch( (err) => console.log(err))

    return res.status(200).json({
        message: "Success!"
    })


}