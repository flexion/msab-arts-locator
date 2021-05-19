import { state } from 'cerebral';

export const setPageAction = ({ props, store }) => {
  store.set(state.currentPage, props.page);
};
