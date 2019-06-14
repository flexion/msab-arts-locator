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

export const LocationListItem = ({ location, haveGeo, index }) => {
  return (
    <React.Fragment>
      <div>
        <a
          href={location.website}
          target="_new"
          className="has-text-primary has-text-weight-semibold"
        >
          <span>
            {index + 1}. {location.name}
          </span>
        </a>
      </div>
      <Media className="msab-location-media">
        <MediaLeft>
          {!location.icon && (
            <Image isSize="64x64" src="https://via.placeholder.com/64x64" />
          )}
          {!!location.icon && <Image isSize="64x64" src={location.icon} />}
        </MediaLeft>
        <MediaContent>
          <Content>
            <Level isMobile className="address-level">
              <LevelLeft>
                <LevelItem className="has-text-grey">
                  {location.street}
                </LevelItem>
              </LevelLeft>
              <LevelRight>
                <LevelItem>
                  <a href={location.googleURL} target="_new">
                    <span className="has-text-primary has-text-weight-semibold">
                      {!haveGeo ? 'Map' : location.distance}
                      <Icon className="msab-has-text-purple fas fa-map-marker-alt" />
                    </span>
                  </a>
                </LevelItem>
              </LevelRight>
            </Level>
            <Level isMobile>
              <LevelLeft>
                <LevelItem className="has-text-grey">{location.city}</LevelItem>
                <LevelItem className="has-text-grey">{location.zip}</LevelItem>
              </LevelLeft>
              <LevelRight />
            </Level>
            <Level isMobile>
              <LevelLeft>
                <LevelItem className="has-text-grey">
                  {location.description}
                </LevelItem>
              </LevelLeft>
              <LevelRight />
            </Level>
            <Level isMobile>
              {location.categories.map((tag, i) => (
                <Tag isColor="info" key={i}>
                  {tag}
                </Tag>
              ))}
            </Level>
          </Content>
        </MediaContent>
      </Media>
    </React.Fragment>
  );
};
