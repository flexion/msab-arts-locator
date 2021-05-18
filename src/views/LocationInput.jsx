import { AppHeader } from './Header';
import { Container, Notification, Section } from 'bloomer';
import { Foot } from './Footer';
import { LocationInputForm } from './LocationInputForm';
import { connect } from '@cerebral/react';
import { state } from 'cerebral';
import React from 'react';
export const LocationInput = connect(
  {
    failure: state.submitLocationFailure,
    submitMsg: state.submitLocationMsg,
    success: state.submitLocationSuccess,
  },
  ({ failure, submitMsg, success }) => {
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
