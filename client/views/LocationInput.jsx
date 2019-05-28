import React from 'react';
import { AppHeader } from './Header';
import { Foot } from './Footer';
import { LocationInputForm } from './LocationInputForm';
import { connect } from '@cerebral/react';
import { sequences } from 'cerebral';

export const LocationInput = connect(
  {},
  ({}) => {
    return (
      <React.Fragment>
        <AppHeader />
        <LocationInputForm />
        <Foot />
      </React.Fragment>
    );
  },
);
