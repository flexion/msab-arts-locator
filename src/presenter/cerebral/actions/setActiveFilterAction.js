import { state } from 'cerebral';

export const setActiveFilterAction = ({ props, store }) => {
  store.set(state.activeFilter, props.value);
};
