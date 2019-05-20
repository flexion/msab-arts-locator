import { state } from 'cerebral';

export const setGeoFailAction = ({ store, props }) => {
  console.log('props', props);
  if (props.result.status === 'denied') store.set(state.haveGeo, false);
};
