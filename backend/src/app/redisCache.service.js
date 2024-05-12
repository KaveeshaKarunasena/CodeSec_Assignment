import Redis from 'ioredis'
import dotenv from 'dotenv';

dotenv.config();

const redisClient = new Redis({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  tls: {
    host: process.env.REDIS_HOST,
  }
});

redisClient.on('error', err => console.error('Redis Client Error:', err));

//set value to redis server with a key
const redis_set_value = async (key, value) => {
  return new Promise((res, rej) => {
    redisClient.set(key, value, (err, v) => {
      if (err) {
        rej(err);
      } else {
        res(true);
      }
    });
  });
};

//set value with an expeir time in redis server
const redis_set_expiry = async (key, seconds_expiry) => {
  return new Promise((res, rej) => {
    if (typeof seconds_expiry !== 'number') {
      rej(new Error('Expiration time must be a valid number'));
      return;
    }

    redisClient.expire(key, seconds_expiry, (err, v) => {
      if (err) {
        rej(err);
      } else {
        res(true);
      }
    });
  });
};

//get value store in server using redis key
const redis_get = async key => {
  return new Promise((res, rej) => {
    redisClient.get(key, (err, v) => {
      if (err) {
        rej(err);
      } else {
        res(v);
      }
    });
  });
};

//revome key with value
const redis_remove = async key => {
  return new Promise((res, rej) => {
    redisClient.del(key, (err, v) => {
      if (err) {
        rej(err);
      } else {
        res(true);
      }
    });
  });
};
//find keys with the provided pattern
const findKeysStartWith = async pattern => {
  return new Promise((res, rej) => {
    try {
      redisClient.keys(pattern, (err, keys) => {
        if (err) {
          res([]);
        } else {
          res(keys);
        }
      });
    } catch (err) {
      res([]);
    }
  });
};

//delete multiple key in the redis server
const deleteMultiple = async keys => {
  if (!keys || keys.length < 1) {
    return;
  }
  return new Promise((res, rej) => {
    try {
      redisClient.del(keys, (err, keys) => {
        if (err) {
          res(false);
        } else {
          res(true);
        }
      });
    } catch (err) {
      res(false);
    }
  });
};
const redis_set_value_expire = async (
  key,
  value,
  seconds_expire,
  returnError = true,
) => {
  try {
    await redis_set_value(key, value);
    await redis_set_expiry(key, seconds_expire);
  } catch (err) {
    console.error(err);
    if (returnError) {
      throw err;
    }
  }
};

export default {
  redis_set_value,
  redis_set_expiry,
  redis_get,
  redis_remove,
  redis_set_value_expire,
  deleteMultiple,
  findKeysStartWith,
};
