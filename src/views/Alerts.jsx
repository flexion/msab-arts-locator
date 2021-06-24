import { Container, Notification, Section } from 'bloomer';
import { connect } from '@cerebral/react';
import { state } from 'cerebral';
import React, { useEffect, useRef } from 'react';

export const Alerts = connect(
  {
    failure: state.submitLocationFailure,
    submitErrors: state.submitLocationErrors,
    submitMsg: state.submitLocationMsg,
  },
  ({ failure, submitErrors, submitMsg }) => {
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
        {failure && (
          <div ref={notificationRef}>
            <Section className="hero is-small is-danger">
              <Notification isColor="danger">
                <p className="msab-has-text-grey-bold is-size-5">
                  There&apos;s an error submitting the form.
                </p>
                {submitErrors && (
                  <p className="msab-has-text-grey is-size-6">{submitMsg}</p>
                )}
                {submitErrors.map((errorMsg, i) => {
                  return <li key={i}>{errorMsg}</li>;
                })}
              </Notification>
            </Section>
          </div>
        )}
      </>
    );
  },
);
