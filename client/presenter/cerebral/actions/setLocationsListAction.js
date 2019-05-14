import { state } from 'cerebral';

export const setLocationsListAction = ({ store, props }) => {
  if (props.result.status === 'success')
    store.set(state.locationsList, props.result.data);
};
