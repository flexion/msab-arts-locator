import { AppHeader } from './Header';
import { Foot } from './Footer';
import { LocationInputForm } from './LocationInputForm';
import React from 'react';
export const LocationInput = () => (
  <React.Fragment>
    <AppHeader />
    <LocationInputForm />
    <Foot />
  </React.Fragment>
);
