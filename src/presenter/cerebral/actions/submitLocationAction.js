export const submitLocationAction = async ({ applicationContext, props }) => {
  console.log('props in submitlocationaction: ', props);
  if (props.result.status === 'success') {
    const result = await applicationContext.getUseCases().sendArtLocation({
      requestData: props.result.artLocation,
      applicationContext,
    });
    console.log('result after sending1: ', result);
    return { result };
  }
  //else {
  //   return props;
  // }
};
