import { state } from 'cerebral';

export const validateLocationAction = async ({ applicationContext, get }) => {
  const result = await applicationContext.getUseCases().validateArtLocation({
    requestData: get(state.form),
    applicationContext,
  });
  return { result };
};
