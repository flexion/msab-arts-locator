import { state } from 'cerebral';

export const setLocationAction = ({ store, props }) => {
  if (typeof props.result === 'string') {
    props.result = JSON.parse(props.result);
  }
  if (props.result.message === 'success') {
    store.set(state.form, props.result.results);
    store.set(state.form.category, JSON.parse(props.result.results.category));
  }
  store.set(state.gettingLocation, false);
};
