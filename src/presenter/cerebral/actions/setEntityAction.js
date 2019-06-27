import { state } from 'cerebral';

export const setEntityAction = ({ store, props }) => {
  store.set(state.entityId, props.entityId);
};
