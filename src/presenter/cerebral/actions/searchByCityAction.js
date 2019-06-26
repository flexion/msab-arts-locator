import { state } from 'cerebral';

export const searchByCityAction = async ({ applicationContext, get }) => {
  const result = await applicationContext.getUseCases().getArtLocationsInCity({
    requestData: { city: get(state`cityValue`) },
    applicationContext,
  });
  return { result };
};
