import { AppHeader } from './Header';
import { Foot } from './Footer';
import { LocationInputForm } from './LocationInputForm';
import { connect } from '@cerebral/react';
import React from 'react';

export const Curate = connect({}, ({}) => {
  return (
    <React.Fragment>
      <AppHeader />
      <span>Curate goes here</span>
      <Foot />
    </React.Fragment>
  );
});
