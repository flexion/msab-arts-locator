import {
  Container,
  Delete,
  Level,
  LevelItem,
  LevelLeft,
  LevelRight,
  Section,
  Select,
  Tag,
  Title,
} from 'bloomer';
import { LocationListItem } from './LocationListItem';
import { connect } from '@cerebral/react';
import { sequences, state } from 'cerebral';

import React from 'react';
import collage from '../images/collage.svg';

class ResultsListComponent extends React.Component {
  componentDidMount() {
    this.props.getGeoLocationSequence();
  }

  render() {
    const { locations } = this.props;
    const { citySearch } = this.props;
    const { categories } = this.props;
    const { activeFilter } = this.props;
    const { setActiveFilter } = this.props;
    const { setRadius } = this.props;
    const { haveGeo } = this.props;

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
                            onClick={() => {
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
                    <Title className="msab-has-text-purple" isSize={5}>
                      Search Results ({locations.length})
                    </Title>
                  </LevelItem>
                </LevelLeft>
                <LevelRight>
                  {haveGeo && !citySearch && (
                    <LevelItem>
                      <span>Within </span>
                      <Select
                        className="msab-margin-lr"
                        defaultValue="10"
                        onChange={e => {
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
              <li key={location.name}>
                <LocationListItem
                  categories={categories}
                  citySearch={citySearch}
                  index={i}
                  location={location}
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
    activeFilter: state.activeFilter,

    categories: state.categories,
    //this alters the location list to include google url
    citySearch: state.citySearch,
    getGeoLocationSequence: sequences.getGeoLocationSequence,
    haveGeo: state.haveGeo,
    locations: state.locationListHelper,
    setActiveFilter: sequences.setActiveFilterSequence,
    setRadius: sequences.setRadiusSequence,
  },
  ResultsListComponent,
);
