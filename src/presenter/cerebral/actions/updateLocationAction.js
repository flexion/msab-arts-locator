export const updateLocationAction = async ({ applicationContext, props }) => {
  if (props.result.status === 'success') {
    const result = await applicationContext.getUseCases().updateArtLocation({
      requestData: props.result.artLocation,
      applicationContext,
    });
    return { result };
  }
};
