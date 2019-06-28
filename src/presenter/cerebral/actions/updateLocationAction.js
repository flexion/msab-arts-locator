export const updateLocationAction = async ({ applicationContext, props }) => {
  if (props.result.status === 'success') {
    console.log('artlocation to update: ', props.result.artLocation);
    const result = await applicationContext.getUseCases().updateArtLocation({
      requestData: props.result.artLocation,
      applicationContext,
    });
    return { result };
  }
};
