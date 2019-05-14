import { connect } from '@cerebral/react';
import { state } from 'cerebral';
import React from 'react';
import { LocationListItem } from './LocationListItem';
import { Section, Container, Title } from 'bloomer';
export const ResultsList = connect(
  {
    locations: state.locationsList,
  },
  ({ locations }) => {
    return (
      <Section>
        <Container>
          {!!locations.length && (
            <Title isSize={4} className="has-text-grey">
              Search Results
            </Title>
          )}
          <ul>
            {locations.map((location, i) => (
              <li key={i}>
                <LocationListItem location={location} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    );
  },
);
