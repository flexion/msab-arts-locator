import React from 'react';
import { Level, LevelItem, Section, Footer, Button } from 'bloomer';

export const Foot = () => (
  <Footer className="msab-has-background-purple msab-footer has-text-white">
    <Section className="msab-footer">
      <Level isMobile>
        <LevelItem className="has-text-centered">
          Want to see your arts location added to our list?
        </LevelItem>
      </Level>
      <Level isMobile>
        <LevelItem className="has-text-centered">
          <Button isColor="primary" href="/submit-location/">
            Submit Location
          </Button>
        </LevelItem>
      </Level>
      <Level isMobile>
        <LevelItem className="msab-tiny-text has-text-centered">
          Presented by the Minnesota State Arts Board
        </LevelItem>
      </Level>
    </Section>
  </Footer>
);
