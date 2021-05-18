import { state } from 'cerebral';

export const setCityAction = ({ props, store }) => {
  store.set(state.cityValue, props.cityValue);
};
