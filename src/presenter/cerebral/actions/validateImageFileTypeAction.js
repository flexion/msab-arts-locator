import { state } from 'cerebral';

export const validateImageFileTypeAction = async ({
  applicationContext,
  get,
  store,
  props,
}) => {
  console.log('props', props.image.content);

  const result = await applicationContext.getUseCases().validateImageFileType({
    image: props.image.content,
  });
  if (result.status === 'success') {
    store.set(state.form.image, props.image);
  } else {
    return { status: 'error: invalid image file type' };
  }
  return { result };
};
