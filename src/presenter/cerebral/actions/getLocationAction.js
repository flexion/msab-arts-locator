import { state } from 'cerebral';

export const getLocationAction = async ({
  applicationContext,
  get,
  store,
  props,
}) => {
  store.set(state.citySearch, true);
  const result = await applicationContext.getUseCases().getArtLocationById({
    requestData: { entityId: props.entityId, actionType: props.actionType },
    applicationContext,
  });
  return { result };
};
