// Access environment variables and handle missing values with defaults

export const redis_port = process.env.redis_port || '6379';

export const EMAIL_API_OTP_VERIFED_TOKEN_EXPIRE = Number(
  process.env.emailApiOTPVerifyTokenExpire || 3600,
);
console.log(
  `emailApiOTPVerifyTokenExpire: ${EMAIL_API_OTP_VERIFED_TOKEN_EXPIRE}`,
);

export const EMAIL_API_OTP_VERIFY_EXPIRE_INTERVAL = Number(
  process.env.emailApiOTPVerifyExpireInterval || 240,
);
console.log(
  `emailApiOTPVerifyExpireInterval: ${EMAIL_API_OTP_VERIFY_EXPIRE_INTERVAL}`,
);

export const EMAIL_API_OTP_INTERVAL = Number(
  process.env.emailApiOTPInterval || 59,
);
console.log(`emailApiOTPInterval: ${EMAIL_API_OTP_INTERVAL}`);

export const EMAIL_API_OTP_VERIFY_CAN_INTERVAL = Number(
  process.env.emailApiOTPVerifyCanInterval || 2,
);
console.log(
  `emailApiOTPVerifyCanInterval: ${EMAIL_API_OTP_VERIFY_CAN_INTERVAL}`,
);
