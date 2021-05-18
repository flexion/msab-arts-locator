const axios = require('axios');

const confirmCaptcha = async ({ key, value }, applicationContext) => {
  if (value && key) {
    let url = `${
      applicationContext.apiURLs().captchaURL
    }?secret=${key}&response=${value}`;
    const response = await axios.get(url);
    if (response && response.data && response.data.success === true) {
      return { status: 'success' };
    } else {
      console.log('user failed captcha check', response);
      return { status: 'failure' };
    }
  } else {
    console.log('missing data');
    return { msg: 'missing data', status: 'catpcha failure' };
  }
};

module.exports = { confirmCaptcha };
