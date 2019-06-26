import React from 'react';
import {
  LevelLeft,
  Image,
  Container,
  LevelRight,
  LevelItem,
  Level,
  Section,
} from 'bloomer';
import logo from '../images/logo1.svg';
import mnlogo from '../images/mnlogo.png';
import artsboard from '../images/artsboard.png';

export const AppHeader = () => (
  <Section className="header-section">
    <Container>
      <Level isMobile>
        <LevelLeft>
          <LevelItem>
            <a href={`${window.location.origin}`}>
              <Image className="logosize" src={logo} />
            </a>
          </LevelItem>
        </LevelLeft>
        <LevelRight>
          <LevelItem>
            <Image isSize="40x65" src={mnlogo} />
          </LevelItem>
          <LevelItem>
            <Image isSize="40x65" src={artsboard} />
          </LevelItem>
        </LevelRight>
      </Level>
    </Container>
  </Section>
);
