export const submitLocationAction = async ({ applicationContext, props }) => {
  if (props.result.status === 'success') {
    const result = await applicationContext.getUseCases().sendArtLocation({
      applicationContext,
      requestData: props.result.artLocation,
    });
    return { result };
  }
};
