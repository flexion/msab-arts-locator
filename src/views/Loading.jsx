import React from 'react';
import logo from '../images/logo1.svg';
import collage from '../images/collage.svg';
import {
  Modal,
  ModalBackground,
  ModalContent,
  Section,
  Level,
  LevelItem,
} from 'bloomer';

export const Loading = (isActive, findingResults, haveGeo) => (
  <Modal isActive={isActive} className="has-text-white msab-loading">
    <ModalBackground className="msab-has-background-purple" />
    <ModalContent style={{ maxHeight: '2000px' }}>
      <Section style={{ margin: '0px', padding: '0px' }}>
        <Level isMobile>
          <LevelItem>
            <img src={collage} style={{ maxWidth: '70%' }} />
          </LevelItem>
        </Level>
        <Level isMobile>
          <LevelItem className="has-text-centered">
            <img src={logo} style={{ maxWidth: '70%' }} />
          </LevelItem>
        </Level>
        <Level isMobile>
          <LevelItem>
            {isActive && (
              <div className="msab-width-70">
                <span>Finding your location</span>
                <span className="msab-loading-ellipsis" />
              </div>
            )}
          </LevelItem>
        </Level>
      </Section>
      <Section>
        <Level isMobile>
          <LevelItem className="msab-loading-footer">
            Presented by the Minnesota State Arts Board
          </LevelItem>
        </Level>
      </Section>
    </ModalContent>
  </Modal>
);
