exports.validateCaptcha = async ({ applicationContext, value }) => {
  // The interactor invokes a very specific persistence gateway operation.
  const captcha = await applicationContext
    .getPersistenceGateway()
    .confirmCaptcha(
      { key: applicationContext.environment.captchaKey, value },
      applicationContext,
    );
  return captcha;
};
