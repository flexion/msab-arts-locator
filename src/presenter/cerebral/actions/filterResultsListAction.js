import { state } from 'cerebral';

export const filterResultsListAction = ({ store, props, get }) => {
  let list = [];
  if (props.value === '') {
    //reset to full list
    list = get(state.locationListBk);
  } else {
    list = get(state.locationListBk).map((loc) => {
      return loc.categories[props.value];
    });
    console.log(list);
  }
  store.set(state.locationsList, props.result.results);
};
