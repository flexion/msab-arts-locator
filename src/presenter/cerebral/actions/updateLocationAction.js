export const updateLocationAction = async ({ applicationContext, props }) => {
  if (props.result.status === 'success') {
    const result = await applicationContext.getUseCases().updateArtLocation({
      applicationContext,
      requestData: props.result.artLocation,
    });
    return { result };
  }
};
