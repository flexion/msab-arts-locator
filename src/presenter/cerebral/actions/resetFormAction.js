import { state } from 'cerebral';
import { defaultForm } from '../../defaultForm';
export const resetFormAction = ({ store, props }) => {
  store.set(state.form, defaultForm);
};
