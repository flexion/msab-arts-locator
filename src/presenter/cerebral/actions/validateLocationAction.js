import { state } from 'cerebral';

export const validateLocationAction = async ({
  applicationContext,
  get,
  store,
  path,
}) => {
  store.set(state.submitLocationSuccess, false);
  store.set(state.submitLocationFailure, false);
  store.set(state.submitLocationMsg, '');
  const result = await applicationContext.getUseCases().validateArtLocation({
    requestData: get(state.form),
    applicationContext,
  });
  if (get(state.form.formDirty)) {
    console.log('path: submit');
    return path.submit({ result });
  } else {
    console.log('path: update');
    return path.update({ result });
  }
};
