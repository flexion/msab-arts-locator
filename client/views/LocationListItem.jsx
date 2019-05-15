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
            <Image isSize="64x64" src="https://via.placeholder.com/64x64" />
          )}
          {!!location.icon && <Image isSize="64x64" src={location.icon} />}
        </MediaLeft>
        <MediaContent>
          <Content>
            <a href="#" className="has-text-primary has-text-weight-semibold">
              <span>{location.name}</span>
            </a>
            <br />
            <Level isMobile>
              <LevelLeft>
                <LevelItem className="has-text-grey">
                  {location.address1}
                </LevelItem>
              </LevelLeft>
              <LevelRight>
                <LevelItem>
                  <span className="has-text-primary has-text-weight-semibold">
                    0 Miles
                    <Icon className="font-purple fas fa-map-marker-alt" />
                  </span>
                </LevelItem>
              </LevelRight>
            </Level>
            <Level isMobile>
              <Tag isColor="info">{location.discipline}</Tag>
            </Level>
          </Content>
        </MediaContent>
      </Media>
    </Box>
  );
};
