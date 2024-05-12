import {
  EMAIL_API_OTP_INTERVAL,
  EMAIL_API_OTP_VERIFED_TOKEN_EXPIRE,
  EMAIL_API_OTP_VERIFY_CAN_INTERVAL,
  EMAIL_API_OTP_VERIFY_EXPIRE_INTERVAL,
} from '../config/config.js';
import { dictionaryTimeRandom, randomNumberStr } from '../utils/utils.js';
import nodemailer from 'nodemailer';
import redisCacheService from './redisCache.service.js';

//send OTP to provided email
const sendOtp = async email => {
  try {
    const redisKey = email + '_otp';
    const redisKeyVerify = email + '_otpVerify';
    //calling the get function in redis service
    let checkLastSent = await redisCacheService.redis_get(redisKey);
    //calling the deleteMultiple function in redis service to delete previous the keys for the email
    await redisCacheService.deleteMultiple(
      await redisCacheService.findKeysStartWith(email),
    );
    //check whether OTP slitt vaild befor send a another one
    if (checkLastSent != null) {
      throw 'Please try again later';
    }

    //add the key to the redis server
    await redisCacheService.redis_set_value_expire(
      redisKey,
      '1',
      EMAIL_API_OTP_INTERVAL,
    );
    //generate the otp
    let otp = randomNumberStr(6);

    const minutes = Math.floor(EMAIL_API_OTP_VERIFY_EXPIRE_INTERVAL / 60);
    const text = `Your Cook app OTP is ${otp}. Please use it within ${minutes} ${
      minutes === 1 ? 'minute' : 'minutes'
    }.`;
    const subject = 'OTP';

    const emailOtp = {
      email,
      subject,
      text,
    };
    //calling the send email function with parameter object
    await sendEmail(emailOtp);
    await redisCacheService.redis_set_value_expire(
      redisKeyVerify,
      otp,
      EMAIL_API_OTP_VERIFY_EXPIRE_INTERVAL,
    );

    return `otp send to this ${email} `;
  } catch (err) {
    throw err;
  }
};

//send the emails to provided email using nodemailer
const sendEmail = async dto => {
  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    //inizialize the nodemailer options
    let mailOptions = {
      from: process.env.USER_EMAIL,
      to: dto.email,
      subject: dto.subject,
      text: dto.text,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        logger.error(error);
      } else {
        logger.info(`Email sent : ${dto.email}`, info.response);
      }
    });
  } catch (err) {
    throw err;
  }
};

// verify the eamil with otp using redis
const verifyEmailOtp = async (email, code) => {
  try {
    const redisKeyOtpCheck = email + '_otpcheck';
    //get the redis otp key
    let otpChecl = await redisCacheService.redis_get(redisKeyOtpCheck);
    if (otpChecl != null) {
      throw 'Please try again later';
    }

    const redisKeyVerify = email + '_otpVerify';
    //get the redis otp verify key
    let referenceId = await redisCacheService.redis_get(redisKeyVerify);
    if (referenceId == null) {
      throw 'OTP Expired';
    }

    await redisCacheService.redis_set_value_expire(
      redisKeyOtpCheck,
      '1',
      EMAIL_API_OTP_VERIFY_CAN_INTERVAL,
    );

    let emailApiResponseCode = false;

    emailApiResponseCode = code == referenceId;

    if (emailApiResponseCode == true) {
      const emailAuthKey = dictionaryTimeRandom(40);
      const emailTOkenkey = email + 'otp_token_key';
      await redisCacheService.redis_set_value_expire(
        emailTOkenkey,
        emailAuthKey,
        EMAIL_API_OTP_VERIFED_TOKEN_EXPIRE,
      );

      return emailAuthKey;
    }
    throw 'OTP not valid';
  } catch (err) {
    throw err;
  }
};

//verify email token with provided one using redis
const verifyEmailToken = async (email, enteredToken) => {
  const emailTOkenkey = email + 'otp_token_key';
  const token = await redisCacheService.redis_get(emailTOkenkey);
  if (token == null) {
    throw 'Email verification failed';
  }
  if (token == enteredToken && enteredToken.length > 10) {
    return email;
  } else {
    throw 'Email verification failed';
  }
};

export default {
  sendEmail,
  verifyEmailOtp,
  verifyEmailToken,
  sendOtp,
};
