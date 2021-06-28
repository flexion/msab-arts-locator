import { state } from 'cerebral';

export const searchByCityAction = async ({
  applicationContext,
  get,
  store,
}) => {
  store.set(state.findingLocations, true);
  store.set(state.citySearch, true);
  const result = await applicationContext.getUseCases().getArtLocationsInCity({
    applicationContext,
    requestData: { city: get(state`cityValue`) },
  });
  return { result };
};
