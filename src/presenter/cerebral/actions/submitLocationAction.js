import { state } from 'cerebral';

export const submitLocationAction = async ({ applicationContext, get }) => {
  const result = await applicationContext.getUseCases().sendArtLocation({
    requestData: { data: get(state.form) },
    applicationContext,
  });
  return { result };
};
