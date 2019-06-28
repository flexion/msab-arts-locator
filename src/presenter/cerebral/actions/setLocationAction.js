import { state } from 'cerebral';

export const setLocationAction = ({ store, props }) => {
  console.log('props: ', props);
  if (typeof props.result === 'string') {
    props.result = JSON.parse(props.result);
  }
  if (props.result.message === 'success') {
    console.log('categories:', props.result.results.category);
    store.set(state.form, props.result.results);
    store.set(state.form.category, JSON.parse(props.result.results.category));
  }
  store.set(state.gettingLocation, false);
};
