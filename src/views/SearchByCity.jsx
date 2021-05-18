import {
  Button,
  Container,
  Control,
  Field,
  Input,
  Label,
  Section,
  Title,
} from 'bloomer';
import { connect } from '@cerebral/react';
import { sequences, state } from 'cerebral';
import React from 'react';
export const SearchByCity = connect(
  {
    cityValue: state.cityValue,
    haveGeo: state.haveGeo,
    searchByCitySequence: sequences.searchByCitySequence,
    updateCitySearchSequence: sequences.updateCitySearchSequence,
  },
  ({ cityValue, haveGeo, searchByCitySequence, updateCitySearchSequence }) => {
    return (
      <Section>
        <Container>
          <Title className="msab-has-text-purple" isSize={3}>
            {haveGeo
              ? 'Find Arts in Minnesota'
              : 'Oops! Can’t Find Your Location'}
          </Title>

          <form
            noValidate
            className="search"
            id="city-search-form"
            onSubmit={e => {
              e.preventDefault();
              searchByCitySequence();
            }}
          >
            <span className="msab-has-text-grey">
              Enter a town/city in Minnesota to get started
            </span>
            <Field hasAddons>
              <Control style={{ maxWidth: '100%', width: '100%' }}>
                <Input
                  className="input is-medium"
                  id="city-search"
                  //type="text"
                  name="citySearch"
                  type="search"
                  value={cityValue}
                  onChange={e => {
                    updateCitySearchSequence({
                      cityValue: e.target.value,
                    });
                  }}
                />
              </Control>
              <Control>
                <Button className="is-medium" isColor="primary" type="submit">
                  <span className="icon is-right has-text-white">
                    <i className="fas fa-search" />
                  </span>
                </Button>
              </Control>
            </Field>
          </form>
        </Container>
      </Section>
    );
  },
);
