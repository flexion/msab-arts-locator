import { state } from 'cerebral';
export const getGeoAction = async ({ applicationContext, store }) => {
  store.set(state.askingLocation, true);
  const result = await applicationContext
    .getUseCases()
    .getGeoLocationInteractor({
      applicationContext,
      requestData: {},
    });
  return { result };
};
