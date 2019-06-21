import { state } from 'cerebral';

export const updateFormValueAction = ({ store, props }) => {
  if (props.value === '') {
    props.value = null;
  }
  store.set(state.form[props.key], props.value);
};
