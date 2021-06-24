import { state } from 'cerebral';

export const submitLocationResultAction = async ({ get, props, store }) => {
  let response = null;
  let action = null;

  if (get(state.form.update.actionType) === 'admin') {
    if (get(state.form.approved)) {
      action = 'Approved!';
    } else {
      action = 'Unapproved!';
    }
  } else if (get(state.form.update.actionType === 'update')) {
    action = 'Updated!';
  } else {
    action = 'Submitted!';
  }
  if (props.result && props.result.response) {
    if (typeof props.result.response === 'string') {
      response = JSON.parse(props.result.response);
    } else {
      ({ response } = props.result);
    }
    if (response.message === 'success') {
      store.set(state.submitLocationSuccess, true);
      store.set(
        state.submitLocationMsg,
        `Art Location Successfully ${action}!`,
      );
      store.set(state.form.formDirty, false);
    }
  } else {
    if (props.result && props.result.data) {
      const fullError = JSON.parse(props.result.data);
      store.set(
        state.submitLocationMsg,
        'Please complete the following form fields',
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
