import { state } from 'cerebral';

export const setActiveFilterAction = ({ store, props }) => {
  console.log('in setactivefilteraction', props);
  if (props.value === '') {
    props.value = null;
  }
  store.set(state.activeFilter, props.value);
};
