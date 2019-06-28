export const submitLocationAction = async ({ applicationContext, props }) => {
  if (props.result.status === 'success') {
    console.log('submitting artlocation: ', props.result.artLocation);
    const result = await applicationContext.getUseCases().sendArtLocation({
      requestData: props.result.artLocation,
      applicationContext,
    });
    return { result };
  }
};
