import { state } from 'cerebral';

export const submitLocationAction = async ({ applicationContext, get }) => {
  const result = await applicationContext.getUseCases().saveNewArtLocation({
    requestData: { data: get(state.form) },
    applicationContext,
  });
  return { result };
};
