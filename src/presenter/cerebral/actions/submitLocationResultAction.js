import { state } from 'cerebral';

export const submitLocationResultAction = async ({ store, props }) => {
  console.log('submitlocationresults: ', props);
  if (props.result.status === 'success') {
    store.set(state.submitLocationSuccess, true);
  } else {
    // eventually do something with validation
    if (props.result && props.result.data) {
      const fullError = JSON.parse(props.result.data);
      store.set(state.submitLocationFailureMsg, fullError[0].message);
    } else {
      store.set(
        state.submitLocationFailureMsg,
        'There was an error submitting your location',
      );
    }
    store.set(state.submitLocationFailure, true);
  }
};
