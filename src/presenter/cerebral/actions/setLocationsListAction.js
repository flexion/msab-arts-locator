import { state } from 'cerebral';

export const setLocationsListAction = ({ store, props }) => {
  if (typeof props.result === 'string') {
    props.result = JSON.parse(props.result);
  }
  if (props.result.message === 'success')
    store.set(state.locationsList, props.result.results);
};
