import { state } from 'cerebral';

export const validateLocationAction = async ({
  applicationContext,
  get,
  store,
  path,
}) => {
  console.log('top of validate');
  store.set(state.submitLocationSuccess, false);
  store.set(state.submitLocationFailure, false);
  store.set(state.submitLocationMsg, '');
  const result = await applicationContext.getUseCases().validateArtLocation({
    requestData: get(state.form),
    applicationContext,
  });
  console.log('validate result: ', result);
  if (get(state.form.formDirty)) {
    console.log('path: submit');
    return path.submit({ result });
  } else {
    console.log('path: update');
    return path.update({ result });
  }
};
