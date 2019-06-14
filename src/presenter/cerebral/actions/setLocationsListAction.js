import { state } from 'cerebral';

export const setLocationsListAction = ({ store, props }) => {
  console.log('props:', props);
  if (props.result.message === 'success')
    store.set(state.locationsList, props.result.results);
};
