import { connect } from '@cerebral/react';
import { sequences, state } from 'cerebral';
import React from 'react';

export const SearchByCity = connect(
  {
    cityValue: state.cityValue,
    searchByCitySequence: sequences.searchByCitySequence,
    updateCitySearchSequence: sequences.updateCitySearchSequence,
  },
  ({ cityValue, searchByCitySequence, updateCitySearchSequence }) => {
    return (
      <form
        className="search"
        id="city-search-form"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          searchByCitySequence();
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
            updateCitySearchSequence({
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
