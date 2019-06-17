import { state } from 'cerebral';

export const setGeoAction = ({ store, props }) => {
  const geo = {
    lat: props.result.data.coords.latitude,
    long: props.result.data.coords.longitude,
  };
  if (props.result.status === 'success') {
    console.log('setting geo');
    store.set(state.haveGeo, true);
    store.set(state.position, geo);
  } else {
    store.set(state.haveGeo, false);
  }
  return { result: geo };
};
