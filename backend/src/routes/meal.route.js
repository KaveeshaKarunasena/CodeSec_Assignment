import { Router } from 'express';
import validate from '../utils/validator.js';
import { body, param } from 'express-validator';
import authGuard from '../auth/authGuard.js'
import mealController from '../controllers/meal.controller.js';


export const mealRoute = Router();

mealRoute.put(
    '/add/fevourite/:meal_id',
    validate([
        param('meal_id')
        .exists()
        .isString()
    ]),
    authGuard,
    mealController.addFavouriteMeals,
  );

  mealRoute.put(
    '/remove/fevourite/:meal_id',
    validate([
        param('meal_id')
        .exists()
        .isString()
    ]),
    authGuard,
    mealController.removeFavouriteMeals,
  );

  mealRoute.get(
    '/get/ids',
    authGuard,
    mealController.getMealIds
  )

  mealRoute.get(
    '/get/fevourite',
    authGuard,
    mealController.getFavouriteMeals
  )
