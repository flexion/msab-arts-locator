import { Button, Footer, Level, LevelItem, Section } from 'bloomer';
import { connect } from '@cerebral/react';
import { state } from 'cerebral';
import React from 'react';

export const Foot = connect(
  {
    codeVersion: state.codeVersion,
  },
  ({ codeVersion }) => {
    return (
      <Footer className="msab-has-background-purple msab-footer has-text-white">
        <Section className="msab-footer">
          <Level isMobile>
            <LevelItem className="has-text-centered">
              Want to see your arts location added to our list?
            </LevelItem>
          </Level>
          <Level isMobile>
            <LevelItem className="has-text-centered">
              <Button href="/submit-location/" isColor="primary">
                Submit Location
              </Button>
            </LevelItem>
          </Level>
          <Level isMobile>
            <LevelItem className="msab-tiny-text has-text-centered">
              Presented by the Minnesota State Arts Board
            </LevelItem>
          </Level>
          <Level isMobile>
            <LevelItem className="msab-tiny-text has-text-centered">
              Site version: {codeVersion}
            </LevelItem>
          </Level>
        </Section>
      </Footer>
    );
  },
);
