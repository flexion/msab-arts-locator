import { state } from 'cerebral';

export const setCityAction = ({ store, props }) => {
  store.set(state.cityValue, props.result.data.cityValue);
};
