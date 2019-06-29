import { state } from 'cerebral';

export const submitLocationResultAction = async ({ store, props }) => {
  let response = null;
  console.log('props.result.response', props.result.response);
  if (props.result && props.result.response && response.message === 'success') {
    if (typeof props.result.response === 'string') {
      response = JSON.parse(props.result.response);
    } else {
      response = props.result.response;
    }
    store.set(state.submitLocationSuccess, true);
    store.set(state.submitLocationMsg, 'Art Location Successfully Submitted!');
    store.set(state.form.formDirty, false);
  } else {
    if (props.result && props.result.data) {
      const fullError = JSON.parse(props.result.data);
      store.set(state.submitLocationMsg, fullError[0].message);
    } else {
      store.set(state.submitLocationMsg, 'Location Failed to Save.');
    }
    store.set(state.submitLocationFailure, true);
  }
};
