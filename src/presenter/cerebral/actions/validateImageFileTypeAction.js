import { state } from 'cerebral';

export const validateImageFileTypeAction = async ({
  applicationContext,
  props,
  store,
}) => {
  // props.image is of type File
  store.set(state.selectImageFailure, false);
  store.set(state.selectImageMsg, '');
  const result = await applicationContext
    .getUseCases()
    .validateImageFileType(props.image);
  if (result.status === 'success') {
    store.set(state.form.base64Image, result.base64Image);
    store.set(state.form.formDirty, true);
  } else {
    store.set(state.form.base64Image, null);
    store.set(state.selectImageFailure, true);
    store.set(state.selectImageMsg, result.status);
    return result;
  }
  return result;
};
