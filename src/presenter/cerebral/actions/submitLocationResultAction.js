import { state } from 'cerebral';

export const submitLocationResultAction = async ({ store, props }) => {
  console.log('submitlocationresults: ', props);
  let response = null;
  if (props.result && props.result.response) {
    if (typeof props.result.response === 'string') {
      response = JSON.parse(props.result.response);
    } else {
      response = props.result.response;
    }
    console.log('response: ', response);
    if (response.message === 'success') {
      store.set(state.submitLocationSuccess, true);
      store.set(
        state.submitLocationMsg,
        'Art Location Successfully Submitted!',
      );
    }
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
