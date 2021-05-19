import { connect } from '@cerebral/react';
import { sequences } from 'cerebral';
import React from 'react';

export const Geo = connect(
  {
    failureSeq: sequences.geoLocationFailSequence,
    successSeq: sequences.geoLocationSuccessSequence,
  },
  ({ failureSeq, successSeq }) => {
    const success = position => {
      successSeq({
        lat: position.coords.latitude,
        long: position.coords.longitude,
        status: 'success',
      });
    };

    const failure = () => {
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
