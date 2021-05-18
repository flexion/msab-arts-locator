import { state } from 'cerebral';

export const setEntityAction = ({ props, store }) => {
  store.set(state.update.entityId, props.entityId);
  store.set(state.update.actionType, props.actionType);
};
