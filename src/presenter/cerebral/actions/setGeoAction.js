import { state } from 'cerebral';

export const setGeoAction = ({ store, props }) => {
  if (props.result.status === 'success') {
    const geo = {
      lat: props.result.data.coords.latitude,
      long: props.result.data.coords.longitude,
    };
    store.set(state.haveGeo, true);
    store.set(state.position, geo);
    return { result: geo };
  } else {
    store.set(state.haveGeo, false);
    return {};
  }
};
