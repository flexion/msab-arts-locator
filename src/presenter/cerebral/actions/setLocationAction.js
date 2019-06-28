import { state } from 'cerebral';

export const setLocationAction = ({ store, props }) => {
  console.log('props: ', props);
  if (typeof props.result === 'string') {
    props.result = JSON.parse(props.result);
  }
  if (props.result.message === 'success') {
    console.log('categories:', props.result.results.categories);
    store.set(state.form, props.result.results);
  }
  store.set(state.findingLocations, false);
};
