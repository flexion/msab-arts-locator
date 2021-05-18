import React from 'react';
import { AppHeader } from './Header';
import { Foot } from './Footer';
import { LocationInputForm } from './LocationInputForm';
import { connect } from '@cerebral/react';

export const Curate = connect({}, ({}) => {
  return (
    <React.Fragment>
      <AppHeader />
      <span>Curate goes here</span>
      <Foot />
    </React.Fragment>
  );
});
