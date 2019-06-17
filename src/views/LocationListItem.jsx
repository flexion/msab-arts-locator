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
          className="has-text-primary location-name"
        >
          <span>
            {index + 1}. {location.name}
          </span>
        </a>
      </div>
      <Media>
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
                <LevelItem className="has-text-grey msab-location-address">
                  {location.street}
                </LevelItem>
              </LevelLeft>
              <LevelRight>
                <LevelItem>
                  <a href={location.googleURL} target="_new">
                    <span className="has-text-primary has-text-weight-semibold msab-location-address">
                      {!haveGeo ? 'Map' : location.distance}
                      <Icon className="msab-has-text-purple fas fa-map-marker-alt" />
                    </span>
                  </a>
                </LevelItem>
              </LevelRight>
            </Level>
            <Level isMobile>
              <LevelLeft>
                <LevelItem className="has-text-grey msab-location-address">
                  {location.city}
                </LevelItem>
                <LevelItem className="has-text-grey msab-location-address">
                  {location.zip}
                </LevelItem>
              </LevelLeft>
              <LevelRight />
            </Level>
            <p className="has-text-grey msab-location-description">
              {location.description}
            </p>
          </Content>
        </MediaContent>
      </Media>
      <div className="msab-location-media">
        {location.categories.map((tag, i) => (
          <Tag
            className="msab-has-background-teal msab-has-text-grey tag-text msab-margin-10"
            key={i}
          >
            {tag}
          </Tag>
        ))}
      </div>
    </React.Fragment>
  );
};
