import accountModel from '../models/account.model.js';
import axios from 'axios';

const addFavouriteMeals = async (id, meal_id) => {
  try {
    console.log(id);
    const updatedAccount = await accountModel.findByIdAndUpdate(
      id,
      { $addToSet: { meal_list: meal_id } },
      { new: true }
    );
    if (!updatedAccount) {
      throw 'User not found';
    }
    return { res: 'Added to Favourites' };
  } catch (err) {
    throw err;
  }
};

const removeMeal = async (id, meal_id) => {
  try {
    const updatedAccount = await accountModel.findByIdAndUpdate(
      id,
      { $pull: { meal_list: meal_id } },
      { new: true }
    );

    if (!updatedAccount) {
      throw 'Account not found or no changes were made.';
    }

    return { res: 'Updated account' };
  } catch (error) {
    console.error('Error updating account:', error);
    throw err;
  }
};

const getMealIds = async id => {
  try {
    const user = await accountModel.findById(id);
    return user.meal_list;
  } catch (err) {
    throw err;
  }
};

const getFavouriteMeals = async (id) => {
    try {
        console.log("here at service");
        const user = await accountModel.findById(id);
        const favouriteMeals = [];

        for (const mealId of user.meal_list) {
            try {
                const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
                const meal = response.data.meals[0];
                if (meal) {
                    favouriteMeals.push(meal);
                }
            } catch (error) {
                console.error(`Error fetching meal with ID ${mealId}: ${error.message}`);
            }
        }

        return favouriteMeals;
    } catch (err) {
        throw err;
    }
};



export default { addFavouriteMeals, removeMeal,getMealIds, getFavouriteMeals  };
