import { Router } from 'express';
import validate from '../utils/validator.js';
import { body } from 'express-validator';
import accountController from '../controllers/account.controller.js';

export const accountRoute = Router();

accountRoute.post(
  '/createAccount',
  validate([
    body('fname').exists().isString(),
    body('lname').exists().isString(),
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Enter an Valid Email '),
    body('password')
      .isString()
      .isLength({ min: 8 })
      .withMessage('Password needs to have atleast 8 characters '),
  ]),
  accountController.signUp,
);

accountRoute.post(
  '/login',
  validate([
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Enter an Valid Email '),
    body('password')
      .isString()
      .isLength({ min: 8 })
      .withMessage('Password needs have atleast 8 characters '),
  ]),
  accountController.login,
);

accountRoute.post(
  '/sendOtp',
  validate([
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Enter an Valid Email '),
  ]),
  accountController.sendOtp,
);

accountRoute.post(
  '/verifyOtp',
  validate([
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Enter an Valid Email '),
  ]),
  accountController.verifyOtp,
);

accountRoute.get(
  '/verifyEmail/:email',
  validate([
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Enter an Valid Email '),
  ]),
  accountController.validateEmail,
);

accountRoute.put(
  '/resetPassword',
  validate([
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Enter an Valid Email '),
  ]),
  accountController.resetPassword,
);
