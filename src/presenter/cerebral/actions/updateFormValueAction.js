import { state } from 'cerebral';

export const updateFormValueAction = ({ store, props }) => {
  if (props.value === '') {
    props.value = null;
  }
  console.log('yuno', props);
  store.set(state.form[props.key], props.value);
};
