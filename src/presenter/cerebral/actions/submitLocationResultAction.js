import { state } from 'cerebral';

export const submitLocationResultAction = async ({ store, props }) => {
  console.log('submitlocationresults: ', props);
  if (
    props.result &&
    props.result.response &&
    props.result.response.status === 201
  ) {
    store.set(state.submitLocationSuccess, true);
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
