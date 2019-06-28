import { state } from 'cerebral';

export const updateFormValueAction = ({ store, props }) => {
  if (props.value === '') {
    props.value = null;
  }
  store.set(state.form[props.key], props.value);
  if (props.key !== 'gresp' && props.key !== 'update.approved') {
    store.set(state.form.formDirty, true);
  }
};
