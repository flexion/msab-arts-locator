import { state } from 'cerebral';

export const searchByCityAction = async ({
  applicationContext,
  store,
  get,
}) => {
  const responseCallback = (response) => {
    if (response.status == 'success') {
      store.set(state.locationsList, response.data);
    }
  };

  await applicationContext.getUseCases().getArtLocationsInCity({
    requestData: { city: get(state`cityValue`) },
    responseCallback,
    applicationContext,
  });
};
