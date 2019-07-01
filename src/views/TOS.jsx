import React from 'react';
import { Section, Container, Title, Level } from 'bloomer';
import { AppHeader } from './Header';
import { Foot } from './Footer';

export const TOS = () => (
  <React.Fragment>
    <AppHeader />

    <Section>
      <Container>
        <Title isSize={3} className="msab-has-text-purple">
          Terms of Service
        </Title>
        <Level isMobile>Terms of Service text goes here. </Level>
      </Container>
    </Section>
    <Foot />
  </React.Fragment>
);
