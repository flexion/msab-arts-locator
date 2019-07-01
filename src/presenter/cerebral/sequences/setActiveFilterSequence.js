import { setActiveFilterAction } from '../actions/setActiveFilterAction';
import { filterResultsListAction } from '../actions/filterResultsListAction';

export const setActiveFilterSequence = [
  setActiveFilterAction,
  filterResultsListAction,
];
