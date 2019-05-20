import { state } from 'cerebral';

export const setGeoPositionAction = ({ store, props }) => {
  if (props.status === 'success') {
    store.set(state.haveGeo, true);
    store.set(state.position, { lat: props.lat, long: props.long });
  }
};
