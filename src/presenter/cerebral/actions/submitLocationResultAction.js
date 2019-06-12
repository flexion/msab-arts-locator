import { state } from 'cerebral';

export const submitLocationResultAction = async ({ store, props }) => {
  if (props.result.status === 'success') {
    store.set(state.submitLocationSuccess, true);
  } else {
    // eventually do something with validation
    const fullError = JSON.parse(props.result.data);
    store.set(state.submitLocationFailure, true);
    store.set(state.submitLocationFailureMsg, fullError[0].message);
  }
};
