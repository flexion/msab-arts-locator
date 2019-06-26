import { state } from 'cerebral';
export const getGeoAction = async ({ applicationContext, get, store }) => {
  console.log('going to ask for location');
  store.set(state.askingLocation, true);
  const result = await applicationContext
    .getUseCases()
    .getGeoLocationInteractor({
      requestData: {},
      applicationContext,
    });
  return { result };
};
