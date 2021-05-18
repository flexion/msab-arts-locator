import {
  Container,
  Image,
  Level,
  LevelItem,
  LevelLeft,
  LevelRight,
  Section,
} from 'bloomer';
import React from 'react';
import artsboard from '../images/artsboard.png';
import logo from '../images/logo1.svg';
import mnlogo from '../images/mnlogo.png';

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
