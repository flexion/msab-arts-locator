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
    findingLocations: state.findingLocations,
    askingLocation: state.askingLocation,
  },
  ({ currentPage, findingLocations, askingLocation }) => {
    console.log('currentPage', currentPage);
    let CurrentPage = pages[currentPage];
    let isActive = findingLocations || askingLocation;
    return (
      <React.Fragment>
        <main id="main-content" role="main">
          {currentPage === 'Home' && (
            <Loading
              isActive={isActive}
              askingLocation={askingLocation}
              findingLocations={findingLocations}
            />
          )}
          <CurrentPage />
        </main>
      </React.Fragment>
    );
  },
);
