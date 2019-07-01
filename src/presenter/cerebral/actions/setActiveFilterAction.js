import { state } from 'cerebral';

export const setActiveFilterAction = ({ store, props }) => {
  if (props.value === '') {
    props.value = null;
  }
  store.set(state.activeFilter, props.value);
};
