import { state } from 'cerebral';

export const setLocationsListAction = ({ store, props }) => {
  if (props.result.message === 'success')
    store.set(state.locationsList, props.result.results);
};
