import { state } from 'cerebral';

export const getLocationAction = async ({
  applicationContext,
  props,
  store,
}) => {
  store.set(state.gettingLocation, true);
  let result = await applicationContext.getUseCases().getArtLocationById({
    applicationContext,
    requestData: { actionType: props.actionType, entityId: props.entityId },
  });

  return { result };
};
