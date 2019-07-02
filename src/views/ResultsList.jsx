import { connect } from '@cerebral/react';
import { state } from 'cerebral';
import React from 'react';
import { LocationListItem } from './LocationListItem';
import {
  Section,
  Container,
  Title,
  Level,
  LevelItem,
  Tag,
  Delete,
  LevelLeft,
  LevelRight,
  Select,
} from 'bloomer';
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
    const activeFilter = this.props.activeFilter;
    const setActiveFilter = this.props.setActiveFilter;
    const setRadius = this.props.setRadius;
    const haveGeo = this.props.haveGeo;

    return (
      <Section>
        <Container>
          {!!locations.length && (
            <React.Fragment>
              <Level className="msab-has-background-grey msab-filter">
                {!activeFilter && 'Click on a Category Tag to Filter'}
                {activeFilter && (
                  <React.Fragment>
                    <Level isMobile>
                      <LevelLeft>
                        <LevelItem>
                          <span>Filtered by: </span>
                        </LevelItem>
                      </LevelLeft>
                      <LevelRight>
                        <LevelItem>
                          <Delete
                            className="msab-delete"
                            onClick={(e) => {
                              setActiveFilter({ value: '' });
                            }}
                          />
                          <Tag className="msab-has-background-teal msab-has-text-grey tag-text msab-margin-lr">
                            {categories[activeFilter]}
                          </Tag>
                        </LevelItem>
                      </LevelRight>
                    </Level>
                  </React.Fragment>
                )}
              </Level>
              <Level isMobile>
                <LevelLeft>
                  <LevelItem>
                    <Title isSize={5} className="msab-has-text-purple">
                      Search Results ({locations.length})
                    </Title>
                  </LevelItem>
                </LevelLeft>
                <LevelRight>
                  {haveGeo && (
                    <LevelItem>
                      <span>Within </span>
                      <Select
                        defaultValue="10"
                        className="msab-margin-lr"
                        onChange={(e) => {
                          setRadius({
                            key: e.target.name,
                            value: e.target.value,
                          });
                        }}
                      >
                        <option value="1">1 mile</option>
                        <option value="5">5 miles</option>
                        <option value="10">10 miles</option>
                        <option value="25">25 miles</option>
                        <option value="50">50 miles</option>
                      </Select>
                    </LevelItem>
                  )}
                </LevelRight>
              </Level>
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
                  setActiveFilter={setActiveFilter}
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
    activeFilter: state.activeFilter,
    getGeoLocationSequence: sequences.getGeoLocationSequence,
    categories: state.categories,
    setActiveFilter: sequences.setActiveFilterSequence,
    setRadius: sequences.setRadiusSequence,
    haveGeo: state.haveGeo,
  },
  ResultsListComponent,
);
