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

        {(success || failure) && (
          <Section>
            <Container>
              <Notification isColor={color}>{submitMsg}</Notification>
            </Container>
          </Section>
        )}

        <LocationInputForm />
        <Foot />
      </React.Fragment>
    );
  },
);
