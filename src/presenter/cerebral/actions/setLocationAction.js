import { state } from 'cerebral';

export const setLocationAction = ({ store, props, get }) => {
  if (typeof props.result === 'string') {
    props.result = JSON.parse(props.result);
  }
  if (props.result.message === 'success') {
    const form = props.result.results;
    form.update = get(state.update);
    form.category = JSON.parse(props.result.results.category);
    store.merge(state.form, form);
  }
  store.set(state.gettingLocation, false);
};
