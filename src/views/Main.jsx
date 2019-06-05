import { Home } from './Home';
import { LocationInput } from './LocationInput';
import { Curate } from './Curate';

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
  },
  ({ currentPage }) => {
    let CurrentPage = pages[currentPage];
    return (
      <React.Fragment>
        <main id="main-content" role="main">
          <CurrentPage />
        </main>
      </React.Fragment>
    );
  },
);
