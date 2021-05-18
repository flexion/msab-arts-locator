import { state } from 'cerebral';

export const validateLocationAction = async ({
  applicationContext,
  get,
  path,
  store,
}) => {
  store.set(state.submitLocationSuccess, false);
  store.set(state.submitLocationFailure, false);
  store.set(state.submitLocationMsg, '');
  const result = await applicationContext.getUseCases().validateArtLocation({
    applicationContext,
    requestData: get(state.form),
  });
  if (
    get(state.form.formDirty) ||
    (get(state.form.update.actionType) === 'update' &&
      get(state.form.formDirty))
  ) {
    return path.submit({ result });
  } else if (get(state.form.update.actionType) === 'admin') {
    return path.update({ result });
  }
};
