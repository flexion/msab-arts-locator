import { state } from 'cerebral';

export const searchByCityAction = async ({
  applicationContext,
  get,
  store,
}) => {
  store.set(state.citySearch, true);
  const result = await applicationContext.getUseCases().getArtLocationsInCity({
    requestData: { city: get(state`cityValue`) },
    applicationContext,
  });
  return { result };
};
