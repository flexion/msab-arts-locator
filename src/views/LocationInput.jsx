import React from 'react';
import { AppHeader } from './Header';
import { Foot } from './Footer';
import { LocationInputForm } from './LocationInputForm';
import { connect } from '@cerebral/react';
import { state } from 'cerebral';
import { Notification, Section, Container } from 'bloomer';
export const LocationInput = connect(
  {
    success: state.submitLocationSuccess,
    failure: state.submitLocationFailure,
    submitMsg: state.submitLocationMsg,
  },
  ({ success, failure, submitMsg }) => {
    let color = success ? 'success' : 'danger';
    return (
      <React.Fragment>
        <AppHeader />
        <LocationInputForm />
        {(success || failure) && (
          <Container>
            <Notification isColor={color}>
              <h1 className="location-name">{submitMsg}</h1>
            </Notification>
          </Container>
        )}
        <Foot />
      </React.Fragment>
    );
  },
);
