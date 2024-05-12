import authService from '../auth/auth.service.js';
import emailService from '../app/email.service.js';

const signUp = async (req, res) => {
  try {
    const dto = req.body;
    const newAcc = await authService.register(dto);
    res.status(201).json(newAcc);
  } catch (err) {
    res.status(400).send({ err: err });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await authService.login(email, password);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).send({ err: err });
  }
};

const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const response = await emailService.sendOtp(email);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).send({ err: err });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, code } = req.body;
    const response = await emailService.verifyEmailOtp(email, code);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).send({ err: err });
  }
};

const validateEmail = async (req, res) => {
  try {
    const { email } = req.params;
    console.log(email);
    const response = await authService.checkEmail(email);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).send({ err: err });
  }
};
const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const response = await authService.resetPassword(email, newPassword);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).send({ err: err });
  }
};
export default {
  signUp,
  login,
  sendOtp,
  verifyOtp,
  validateEmail,
  resetPassword,
};
