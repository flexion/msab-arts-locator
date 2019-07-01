import { state } from 'cerebral';

export const setActiveFilterAction = ({ store, props }) => {
  store.set(state.activeFilter, props.value);
};
