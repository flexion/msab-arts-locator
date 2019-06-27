import { connect } from '@cerebral/react';
import { state } from 'cerebral';
import React from 'react';
import { LocationListItem } from './LocationListItem';
import { Filter } from './Filter';
import { Section, Container, Title, Level, LevelItem } from 'bloomer';
import { sequences } from 'cerebral';
import collage from '../images/collage.svg';

class ResultsListComponent extends React.Component {
  componentDidMount() {
    this.props.getGeoLocationSequence();
  }

  render() {
    const locations = this.props.locations;
    const citySearch = this.props.citySearch;
    const categories = this.props.categories;

    return (
      <Section>
        <Container>
          {!!locations.length && (
            <React.Fragment>
              <Title isSize={5} className="msab-has-text-purple">
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
                  citySearch={citySearch}
                  categories={categories}
                />
              </li>
            ))}
          </ul>
          {!locations.length && (
            <Level>
              <LevelItem>
                <img src={collage} />
              </LevelItem>
            </Level>
          )}
        </Container>
      </Section>
    );
  }
}
export const ResultsList = connect(
  {
    locations: state.locationListHelper, //this alters the location list to include google url
    citySearch: state.citySearch,
    getGeoLocationSequence: sequences.getGeoLocationSequence,
    categories: state.categories,
  },
  ResultsListComponent,
);
