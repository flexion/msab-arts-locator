export const getReverseCityAction = async ({ applicationContext, props }) => {
  const result = await applicationContext
    .getUseCases()
    .getReverseCityLookupInteractor({
      applicationContext,
      requestData: props,
    });
  return result.data;
};
