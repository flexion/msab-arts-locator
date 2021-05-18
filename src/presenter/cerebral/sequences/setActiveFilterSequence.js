import { filterResultsListAction } from '../actions/filterResultsListAction';
import { setActiveFilterAction } from '../actions/setActiveFilterAction';

export const setActiveFilterSequence = [
  setActiveFilterAction,
  filterResultsListAction,
];
