import { state } from 'cerebral';

export const setGeoPositionAction = ({ store, props }) => {
  console.log('props', props);
  if (props.result.status === 'success') {
    store.set(state.haveGeo, true);
    store.set(state.position, props.position);
  }
};
