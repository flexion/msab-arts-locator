import { state } from 'cerebral';

export const submitLocationResultAction = async ({ store, props }) => {
  if (props.result.status === 'success') {
    store.set(state.submitLocationSuccess, true);
  } else {
    // eventually do something with validation
    console.log('validation or something failed on submit');
  }
};
