import { state } from 'cerebral';

export const searchByCityAction = async ({ applicationContext, get }) => {
  console.log('in serachbycityaction');
  const result = await applicationContext.getUseCases().getArtLocationsInCity({
    requestData: { city: get(state`cityValue`) },
    applicationContext,
  });
  console.log('result: ', result);
  return { result };
};
