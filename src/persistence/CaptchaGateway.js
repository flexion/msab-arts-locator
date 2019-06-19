const axios = require('axios');

const confirmCaptcha = async ({ value, key }) => {
  if (value && key) {
    const googleUrl = ` https://www.google.com/recaptcha/api/siteverify`;
    let url = `${googleUrl}?secret=${key}&response=${value}`;
    const response = await axios.get(url);
    if (response && response.data && response.data.success === true) {
      return { status: 'success' };
    } else {
      console.log('user failed captcha check', response);
      return { status: 'failure' };
    }
  } else {
    console.log('missing data');
    return { status: 'catpcha failure', msg: 'missing data' };
  }
};

module.exports = { confirmCaptcha };
