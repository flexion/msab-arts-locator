import { state } from 'cerebral';

export const getLocationAction = async ({ applicationContext, get, store }) => {
  store.set(state.citySearch, true);
  const result = await applicationContext.getUseCases().getArtLocationById({
    requestData: { entityId: get(state`entityId`) },
    applicationContext,
  });
  return { result };
};
