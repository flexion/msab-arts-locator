import { connect } from '@cerebral/react';
import { state } from 'cerebral';
import React from 'react';
import { LocationListItem } from './LocationListItem';
import { Filter } from './Filter';
import { Section, Container, Title } from 'bloomer';
export const ResultsList = connect(
  {
    locations: state.locationListHelper, //this alters the location list to include google url
    haveGeo: state.haveGeo,
  },
  ({ locations, haveGeo }) => {
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
                <LocationListItem
                  location={location}
                  index={i}
                  haveGeo={haveGeo}
                />
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    );
  },
);
