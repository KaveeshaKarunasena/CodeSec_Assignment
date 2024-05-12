//create a random number type of string
export const randomNumberStr = len => {
  let text = '';
  const values = '9876543210';
  for (var i = 0; i < len; i++)
    text += values.charAt(Math.floor(Math.random() * values.length));

  return text;
};

//create a random test and add today date to it
const possibleDictionary = 'ABDEFGHKMNPQRSTUVWXYZabdefghkmnpqrstuvwxyz23456789';
export const dictionaryTimeRandom = len => {
  let text = '';
  for (var i = 0; i < len; i++)
    text += possibleDictionary.charAt(
      Math.floor(Math.random() * possibleDictionary.length),
    );

  return text + Date.now();
};

//validate input time format HH:MM
export const validateTimeFormat = timeString => {
  const timeRegex = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;
  return timeRegex.test(timeString);
};

//conver time to ISOdateTim format
export const convertTimeStringToISODateTime = timeString => {
  const formatTime = validateTimeFormat(timeString);
  if (!formatTime) {
    throw 'input an valid time format(HH:MM)';
  }
  const currentDate = new Date().toISOString().split('T')[0];
  const [hours, minutes] = timeString.split(':');
  const isoDateTimeString = `${currentDate}T${hours.padStart(
    2,
    '0',
  )}:${minutes.padStart(2, '0')}:00.000Z`;
  return isoDateTimeString;
};
