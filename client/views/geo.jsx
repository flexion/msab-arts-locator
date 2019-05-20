import { connect } from '@cerebral/react';
import { sequences } from 'cerebral';
import React from 'react';

export const Geo = connect(
  {
    successSeq: sequences.geoLocationSuccessSequence,
    failureSeq: sequences.geoLocationFailSequence,
  },
  ({ successSeq, failureSeq }) => {
    // const success = (position) => {
    //   console.log('in success');
    //   successSeq({ status: 'success', position });
    // };

    if (!navigator.geolocation) {
      failureSeq('denied');
      return <div>fail geo </div>;
    } else {
      console.log('navigator.geolocation is a thing');
      navigator.geolocation.getCurrentPosition(
        (props) => {
          console.log('props', props);
        },
        (fail) => {
          console.log('failboat', fail);
        },
      );
      return <div />;
    }
  },
);
