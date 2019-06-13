import { state } from 'cerebral';

export const validateLocationAction = async ({
  applicationContext,
  get,
  store,
}) => {
  store.set(state.submitLocationSuccess, false);
  store.set(state.submitLocationFailure, false);
  store.set(state.submitLocationMsg, '');
  const result = await applicationContext.getUseCases().validateArtLocation({
    requestData: get(state.form),
    applicationContext,
  });
  return { result };
};
