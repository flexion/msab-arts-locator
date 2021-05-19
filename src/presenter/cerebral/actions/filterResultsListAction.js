import { locationListHelper } from '../computeds/locationListHelper';
import { state } from 'cerebral';

export const filterResultsListAction = ({ get, props, store }) => {
  let filteredList = [];
  if (props.value === '') {
    //reset to full list
    filteredList = get(state.locationsListBk);
  } else {
    let list = locationListHelper(get, get(state.locationsListBk));
    list.forEach(loc => {
      loc.categories.forEach(cat => {
        if (cat === props.value) {
          filteredList.push(loc);
        }
      });
    });
  }
  store.set(state.locationsList, filteredList);
};
