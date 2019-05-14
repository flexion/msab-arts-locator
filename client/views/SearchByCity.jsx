import { connect } from '@cerebral/react';
import { sequences, state } from 'cerebral';
import React from 'react';
import {
  Field,
  Label,
  Control,
  Input,
  Button,
  Section,
  Container,
  Title,
} from 'bloomer';
export const SearchByCity = connect(
  {
    cityValue: state.cityValue,
    searchByCitySequence: sequences.searchByCitySequence,
    updateCitySearchSequence: sequences.updateCitySearchSequence,
  },
  ({ cityValue, searchByCitySequence, updateCitySearchSequence }) => {
    return (
      <Section className="has-background-grey">
        <Container>
          <Title isSize={2} className="has-text-white">
            Explore Minnesota Arts
          </Title>

          <form
            className="search"
            id="city-search-form"
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              searchByCitySequence();
            }}
          >
            <Field>
              <Label className="has-text-white">
                Enter a city to find art near you
              </Label>
              <Control>
                <Input
                  type="text"
                  id="city-search"
                  name="citySearch"
                  value={cityValue}
                  onChange={(e) => {
                    updateCitySearchSequence({
                      cityValue: e.target.value,
                    });
                  }}
                />
              </Control>
            </Field>
            <Control>
              <Button isColor="primary" type="submit">
                Search
              </Button>
            </Control>
          </form>
        </Container>
      </Section>
    );
  },
);
