import { state } from 'cerebral';

export const setGeoFailAction = ({ store, props }) => {
  if (props.status === 'denied') store.set(state.haveGeo, false);
};
