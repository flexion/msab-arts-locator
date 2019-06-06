import { state } from 'cerebral';

export const submitLocationAction = async ({ applicationContext, get }) => {
  console.log('submitlocationaction');
  const result = await applicationContext.getUseCases().sendArtLocation({
    requestData: { data: get(state.form) },
    applicationContext,
  });
  return { result };
};
