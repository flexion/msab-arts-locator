import { state } from 'cerebral';
export const getGeoAction = async ({ applicationContext, get, store }) => {
  store.set(state.askingLocation, true);
  const result = await applicationContext
    .getUseCases()
    .getGeoLocationInteractor({
      requestData: {},
      applicationContext,
    });
  return { result };
};
