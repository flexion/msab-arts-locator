import React from 'react';
import spinner from '../images/logo1.gif';

export const Loading = (findingResults, askingLocation, haveGeo) => (
  <div className="msab-has-background-purple">
    <img src={spinner} />
    {askingLocation && <div>Finding your location</div>}
  </div>
);
