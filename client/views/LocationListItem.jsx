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
} from 'bloomer';

export const LocationListItem = ({ location, hasGeo }) => {
  return (
    <Media className="msab-location-media">
      <MediaLeft>
        {!!location.icon && (
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
                <a href={location.googleURL} target="_new">
                  <span className="has-text-primary has-text-weight-semibold">
                    {!hasGeo ? 'Map' : location.distance}
                    <Icon className="font-purple fas fa-map-marker-alt" />
                  </span>
                </a>
              </LevelItem>
            </LevelRight>
          </Level>
          <Level isMobile>
            <Tag isColor="info">{location.discipline}</Tag>
          </Level>
        </Content>
      </MediaContent>
    </Media>
  );
};
