exports.validateCaptcha = async ({ value, applicationContext }) => {
  // The interactor invokes a very specific persistence gateway operation.
  const captcha = await applicationContext
    .getPersistenceGateway()
    .confirmCaptcha({ value, key: applicationContext.environment.captchaKey });
  return captcha;
};
