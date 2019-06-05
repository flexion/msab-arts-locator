export const getGeoAction = async ({ applicationContext, get }) => {
  const result = await applicationContext
    .getUseCases()
    .getGeoLocationInteractor({
      requestData: {},
      applicationContext,
    });
  return { result };
};
