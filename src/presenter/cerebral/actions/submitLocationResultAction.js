import { state } from 'cerebral';

export const submitLocationResultAction = async ({
  get,
  path,
  props,
  store,
}) => {
  let response = null;
  let successMessage = null;
  let successDetail = null;

  store.set(state.submitLocationErrors, []);
  if (get(state.form.update.actionType) === 'admin') {
    if (get(state.form.approved)) {
      successMessage = 'Art Location Successfully Approved!';
    } else {
      successMessage = 'Art Location Successfully Unapproved!';
    }
  } else if (get(state.form.update.actionType === 'update')) {
    successMessage = 'Thanks for Your Update.';
  } else {
    successMessage = 'Thanks for Your Submission';
    successDetail =
      'A Minnesota State Arts Board administrator will review your submission before publishing it on the site.';
  }
  if (props.result && props.result.response) {
    if (typeof props.result.response === 'string') {
      response = JSON.parse(props.result.response);
    } else {
      ({ response } = props.result);
    }
    if (response.message === 'success') {
      store.set(state.submitLocationSuccess, true);
      store.set(state.submitLocationMsg, successMessage);
      store.set(state.submitLocationMsgDetail, successDetail);
      store.set(state.form.formDirty, false);
      return path.success({ page: 'Home' });
    }
  } else {
    if (props.result && props.result.data) {
      const fullError = JSON.parse(props.result.data);
      store.set(
        state.submitLocationMsg,
        "There's an error submitting the form.",
      );
      store.set(
        state.submitLocationMsgDetail,
        'Please complete the following form fields:',
      );
      store.set(
        state.submitLocationErrors,
        fullError.map(error => error.message),
      );
    } else {
      store.set(state.submitLocationMsg, 'Location Failed to Send.');
    }
    store.set(state.submitLocationFailure, true);
  }
};
