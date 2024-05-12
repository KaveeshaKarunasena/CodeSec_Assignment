import mealService from "../services/meal.service.js";


const addFavouriteMeals = async (req, res) => {
  try {
    const id = req.currentUser.id;
    const {meal_id} = req.params;
    const meals = await mealService.addFavouriteMeals(id,meal_id)
    res.status(201).json(meals);
  } catch (err) {
    res.status(400).send({ err: err });
  }
};

const removeFavouriteMeals = async (req, res) => {
    try {
      const id = req.currentUser.id;
      const {meal_id} = req.params;
      const meals = await mealService.removeMeal(id,meal_id)
      res.status(201).json(meals);
    } catch (err) {
      res.status(400).send({ err: err });
    }
  };


  const getMealIds = async (req, res) => {
    try {
      const id = req.currentUser.id;
      const mealsId = await mealService.getMealIds(id)
      res.status(201).json(mealsId);
    } catch (err) {
      res.status(400).send({ err: err });
    }
  };

  const getFavouriteMeals = async (req, res) => {
    try {
        
      const id = req.currentUser.id;
      console.log(id)
      const mealsId = await mealService.getFavouriteMeals(id)
      res.status(201).json(mealsId);
    } catch (err) {
      res.status(400).send({ err: err });
    }
  };


export default {
    addFavouriteMeals,
    removeFavouriteMeals,
    getMealIds,
    getFavouriteMeals,
    
}