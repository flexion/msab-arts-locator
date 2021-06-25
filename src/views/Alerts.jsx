import { Section } from 'bloomer';
import { connect } from '@cerebral/react';
import { state } from 'cerebral';
import React, { useEffect, useRef } from 'react';

export const Alerts = connect(
  {
    failure: state.submitLocationFailure,
    submitErrors: state.submitLocationErrors,
    submitMsg: state.submitLocationMsg,
    submitMsgDetail: state.submitLocationMsgDetail,
    success: state.submitLocationSuccess,
  },
  ({ failure, submitErrors, submitMsg, submitMsgDetail, success }) => {
    const notificationRef = useRef(null);
    useEffect(() => {
      const notification = notificationRef.current;
      if (notification) {
        const top = notificationRef.current.offsetTop;
        window.scrollTo(0, top);
      }
    });
    return (
      <>
        {(failure || success) && (
          <div ref={notificationRef}>
            <Section className="hero is-small is-danger">
              <div>
                <p className="msab-has-text-grey is-size-5">{submitMsg}</p>
                <p className="msab-has-text-grey is-size-6">
                  {submitMsgDetail}
                </p>
                {submitErrors.map((errorMsg, i) => {
                  return <li key={i}>{errorMsg}</li>;
                })}
              </div>
            </Section>
          </div>
        )}
      </>
    );
  },
);
