import React from 'react';
import {
  Media,
  Content,
  MediaLeft,
  MediaContent,
  Level,
  LevelLeft,
  LevelRight,
  LevelItem,
  Image,
  Icon,
  Tag,
  Box,
} from 'bloomer';

export const LocationListItem = ({ location }) => {
  return (
    <Box>
      <Media>
        <MediaLeft>
          {!location.icon && (
            <Image isSize="128x128" src="https://via.placeholder.com/128x128" />
          )}
          {!!location.icon && <Image isSize="128x128" src={location.icon} />}
        </MediaLeft>
        <MediaContent>
          <Content>
            <p />
            <a href="#">
              <strong>{location.name}</strong>
            </a>
            <br />
            <Level isMobile>
              <LevelLeft>
                <LevelItem>{location.address1}</LevelItem>
              </LevelLeft>
              <LevelRight>
                <LevelItem>
                  <span className="distance-text">Distance Unavailable</span>
                  <Icon isSize="small">
                    <span className="map-icon" />
                  </Icon>
                </LevelItem>
              </LevelRight>
            </Level>
            <Level isMobile>
              <Tag isColor="info">tags go here</Tag>
            </Level>
          </Content>
        </MediaContent>
      </Media>
    </Box>
  );
};
