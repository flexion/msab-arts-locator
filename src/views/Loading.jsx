import {
  Level,
  LevelItem,
  Modal,
  ModalBackground,
  ModalContent,
  Section,
} from 'bloomer';
import React from 'react';
import collage from '../images/collage.svg';
import logo from '../images/logo1.svg';

export const Loading = ({
  askingLocation,
  findingLocations,
  gettingLocation,
  isActive,
}) => {
  return (
    <Modal className="has-text-white msab-loading" isActive={isActive}>
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
              {askingLocation && (
                <div className="msab-width-70">
                  <span>Finding your location</span>
                  <span className="msab-loading-ellipsis" />
                </div>
              )}
              {findingLocations && (
                <div className="msab-width-70">
                  <span>Retrieving locations</span>
                  <span className="msab-loading-ellipsis" />
                </div>
              )}
              {gettingLocation && (
                <div className="msab-width-70">
                  <span>Retrieving location</span>
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
};
