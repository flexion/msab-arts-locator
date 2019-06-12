import React from 'react';
import { AppHeader } from './Header';
import { Foot } from './Footer';
import { LocationInputForm } from './LocationInputForm';
import { connect } from '@cerebral/react';
import { state } from 'cerebral';
import { Title } from 'bloomer';
export const LocationInput = connect(
  {
    success: state.submitLocationSuccess,
    failure: state.submitLocationFailure,
    failMsg: state.submitLocationFailureMsg,
  },
  ({ success, failure, failMsg }) => {
    return (
      <React.Fragment>
        <AppHeader />
        {success && (
          <div>
            <Title>Art Location Successfully Submitted!</Title>
          </div>
        )}
        {failure && (
          <div>
            <Title>{failMsg}</Title>
          </div>
        )}
        <LocationInputForm />
        <Foot />
      </React.Fragment>
    );
  },
);
