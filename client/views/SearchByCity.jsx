import { connect } from '@cerebral/react';
import { sequences, state } from 'cerebral';
import React from 'react';

export const SearchByCity = connect(
  {
    cityValue: state.cityValue,
    submitCitySearchSequence: sequences.submitSearchSequence,
    updateSearchTermSequence: sequences.updateSearchTermSequence,
  },
  ({ cityValue, submitCitySearchSequence, updateSearchTermSequence }) => {
    return (
      <form
        className="search"
        id="city-search-form"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          submitCitySearchSequence();
        }}
      >
        <label className="sr-only" htmlFor="city-search">
          Search term
        </label>
        <input
          id="city-search"
          type="search"
          name="citySearch"
          value={cityValue}
          onChange={(e) => {
            updateSearchTermSequence({
              cityValue: e.target.value,
            });
          }}
        />
        <button type="submit">
          <span className="search-city-submit">Search</span>
        </button>
      </form>
    );
  },
);
