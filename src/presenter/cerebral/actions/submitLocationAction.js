export const submitLocationAction = async ({ applicationContext, props }) => {
  if (props.result.status === 'success') {
    const result = await applicationContext.getUseCases().sendArtLocation({
      requestData: props.result.artLocation,
      applicationContext,
    });
    return { result };
  }
  //else {
  //   return props;
  // }
};
