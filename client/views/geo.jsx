import { connect } from '@cerebral/react';
import { sequences } from 'cerebral';
import React from 'react';

export const Geo = connect(
  {
    successSeq: sequences.geoLocationSuccessSequence,
    failureSeq: sequences.geoLocationFailSequence,
  },
  ({ successSeq, failureSeq }) => {
    const success = (position) => {
      successSeq({
        status: 'success',
        lat: position.coords.latitude,
        long: position.coords.longitude,
      });
    };

    const failure = (err) => {
      failureSeq({ status: 'denied' });
    };

    if (!navigator.geolocation) {
      failureSeq({ status: 'denied' });
      return <div>fail geo </div>;
    } else {
      navigator.geolocation.getCurrentPosition(success, failure, {
        enableHighAccuracy: true,
      });
      return null;
    }
  },
);
