export const getReverseCityAction = async ({ applicationContext, props }) => {
  const result = await applicationContext
    .getUseCases()
    .getReverseCityLookupInteractor({
      requestData: props,
      applicationContext,
    });
  return result.data;
};
