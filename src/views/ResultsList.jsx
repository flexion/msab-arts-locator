import { connect } from '@cerebral/react';
import { state } from 'cerebral';
import React from 'react';
import { LocationListItem } from './LocationListItem';
import { Filter } from './Filter';
import { Section, Container, Title } from 'bloomer';
export const ResultsList = connect(
  {
    locations: state.locationListHelper, //this alters the location list to include google url
    hasGeo: state.hasGeo,
  },
  ({ locations, hasGeo }) => {
    return (
      <Section>
        <Container>
          {!!locations.length && (
            <React.Fragment>
              <Title isSize={4} className="has-text-grey">
                Search Results ({locations.length})
              </Title>
            </React.Fragment>
          )}
          <ul>
            {locations.map((location, i) => (
              <li key={i}>
                <LocationListItem location={location} hasGeo={hasGeo} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    );
  },
);
