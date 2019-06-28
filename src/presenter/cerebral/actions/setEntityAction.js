import { state } from 'cerebral';

export const setEntityAction = ({ store, props }) => {
  store.set(state.update.entityId, props.entityId);
  store.set(state.update.actionType, props.actionType);
};
