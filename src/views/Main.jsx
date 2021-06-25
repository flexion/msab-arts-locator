import { Curate } from './Curate';
import { Home } from './Home';
import { Loading } from './Loading';
import { LocationInput } from './LocationInput';
import { TOS } from './TOS';
import { connect } from '@cerebral/react';
import { state } from 'cerebral';
import React from 'react';

const pages = {
  Curate,
  Home,
  LocationInput,
  TOS,
};

export const Main = connect(
  {
    askingLocation: state.askingLocation,
    currentPage: state.currentPage,
    findingLocations: state.findingLocations,
    gettingLocation: state.gettingLocation,
  },
  ({ askingLocation, currentPage, findingLocations, gettingLocation }) => {
    let CurrentPage = pages[currentPage];
    let isActive = findingLocations || askingLocation || gettingLocation;
    return (
      <>
        <main id="main-content" role="main">
          {/* {currentPage === 'Home' && ( */}
          <Loading
            askingLocation={askingLocation}
            findingLocations={findingLocations}
            gettingLocation={gettingLocation}
            isActive={isActive}
          />
          {/* )} */}
          <CurrentPage />
        </main>
      </>
    );
  },
);
