import { state } from 'cerebral';

export const setLocationAction = ({ store, props }) => {
  if (typeof props.result === 'string') {
    props.result = JSON.parse(props.result);
  }
  if (props.result.message === 'success') {
    store.set(state.location, props.result.results);
  }
};
