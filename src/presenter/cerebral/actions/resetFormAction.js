import { defaultForm } from '../../defaultForm';
import { state } from 'cerebral';
export const resetFormAction = ({ store }) => {
  store.set(state.form, defaultForm);
};
