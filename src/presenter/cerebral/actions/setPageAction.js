import { state } from 'cerebral';

export const setPageAction = ({ store, props }) => {
  store.set(state.currentPage, props.page);
};
