import { state } from 'cerebral';

export const clearAlertsAction = ({ store }) => {
  store.set(state.submitLocationSuccess, false);
  store.set(state.submitLocationMsg, '');
  store.set(state.submitLocationMsgDetail, '');
  store.set(state.submitLocationErrors, []);
};
