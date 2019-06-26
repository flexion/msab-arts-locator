import { Home } from './Home';
import { LocationInput } from './LocationInput';
import { Curate } from './Curate';
import { Loading } from './Loading';
import { connect } from '@cerebral/react';
import { state } from 'cerebral';
import React from 'react';

const pages = {
  Home,
  LocationInput,
  Curate,
};

export const Main = connect(
  {
    currentPage: state.currentPage,
    findingResults: state.findingResults,
    askingLocation: state.askingLocation,
    haveGeo: state.haveGeo,
  },
  ({ currentPage, findingResults, askingLocation, haveGeo }) => {
    let CurrentPage = pages[currentPage];
    return (
      <React.Fragment>
        <main id="main-content" role="main">
          {/* {askingLocation && <Loading />} */}
          <CurrentPage />
        </main>
      </React.Fragment>
    );
  },
);
