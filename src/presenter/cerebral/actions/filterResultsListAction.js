import { state } from 'cerebral';
import { locationListHelper } from '../computeds/locationListHelper';

export const filterResultsListAction = ({ store, props, get }) => {
  let filteredList = [];
  if (props.value === '') {
    //reset to full list
    filteredList = get(state.locationsListBk);
  } else {
    let list = locationListHelper(get, get(state.locationsListBk));
    list.forEach((loc) => {
      loc.categories.forEach((cat) => {
        if (cat === props.value) {
          filteredList.push(loc);
        }
      });
    });
    console.log('filtered list: ', filteredList);
  }
  store.set(state.locationsList, filteredList);
};
