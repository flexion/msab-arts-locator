import { state } from 'cerebral';

export const updateFormValueAction = ({ store, props }) => {
  if (props.value === '') {
    props.value = null;
  }
  console.log('props.key', props.key);
  store.set(state.form[props.key], props.value);
  if (props.key !== 'gresp' && props.key !== 'approved') {
    store.set(state.form.formDirty, true);
  }
};
