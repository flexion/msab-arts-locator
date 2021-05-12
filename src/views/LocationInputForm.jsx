import { connect } from '@cerebral/react';
import ReCAPTCHA from 'react-google-recaptcha';
import { sequences, state } from 'cerebral';
import React from 'react';
import {
  Field,
  Label,
  Control,
  Input,
  Button,
  Section,
  Container,
  Title,
  Checkbox,
  Subtitle,
  TextArea,
  Notification,
} from 'bloomer';
import { RECAPTCHA_KEY } from '../config/config';

export const LocationInputForm = connect(
  {
    form: state.form,
    submitLocation: sequences.submitLocationSequence,
    updateFormValueSequence: sequences.updateFormValueSequence,
    setImageSequence: sequences.setImageSequence,
    imgFailure: state.selectImageFailure,
    imgMsg: state.selectImageMsg,
    categories: state.categories,
    locationFormButtonsHelper: state.locationFormButtonsHelper,
  },
  ({
    form,
    submitLocation,
    updateFormValueSequence,
    setImageSequence,
    imgFailure,
    imgMsg,
    categories,
    locationFormButtonsHelper,
  }) => {
    const onSubmit = (e, appr) => {
      e.preventDefault();
      const gresp = grecaptcha.getResponse();
      if (gresp) {
        updateFormValueSequence({
          key: 'gresp',
          value: gresp,
        });

        updateFormValueSequence({
          key: 'approved',
          value: appr,
        });
      }
      submitLocation();
      grecaptcha.reset();
    };

    return (
      <Section className="msab-section-form">
        <Container>
          <Title isSize={3} className="msab-has-text-purple">
            Submit Your Arts Location
          </Title>
          <Subtitle isSize={5} className="msab-has-text-grey">
            Fill out this form and a Minnesota State Arts Board administrator
            will review it before publishing.
          </Subtitle>
          <Subtitle isSize={6} className="msab-has-text-grey-bold">
            * All fields required unless otherwise noted
          </Subtitle>
          <Title isSize={4} className="msab-has-text-purple">
            Your Location
          </Title>
          <form className="search" id="add-location-form" noValidate>
            <Field>
              <Label className="msab-has-text-grey">Name</Label>
              <Subtitle className="msab-has-text-grey-small">
                How do you want people to know and find you? (e.g., your legal
                name, your publicity name, a DBA, a pen name, etc.)
              </Subtitle>
              <Control className="text-field">
                <Input
                  type="text"
                  name="name"
                  value={form.name || ''}
                  onChange={(e) => {
                    updateFormValueSequence({
                      key: e.target.name,
                      value: e.target.value,
                    });
                  }}
                />
              </Control>
            </Field>
            <Field>
              <Label className="msab-has-text-grey">Street Address</Label>
              <Subtitle className="msab-has-text-grey-small">
                Where do you want people to find you and potentially visit?
                (e.g., a performance venue, your studio, retail location, etc.)
              </Subtitle>
              <Control className="text-field">
                <Input
                  type="text"
                  name="street"
                  value={form.street || ''}
                  onChange={(e) => {
                    updateFormValueSequence({
                      key: e.target.name,
                      value: e.target.value,
                    });
                  }}
                />
              </Control>
            </Field>
            <Field>
              <Label className="msab-has-text-grey">Town/City</Label>
              <Control className="text-field">
                <Input
                  type="text"
                  name="city"
                  value={form.city || ''}
                  onChange={(e) => {
                    updateFormValueSequence({
                      key: e.target.name,
                      value: e.target.value,
                    });
                  }}
                />
              </Control>
            </Field>
            <Field>
              <Label className="msab-has-text-grey">ZIP</Label>
              <Control className="text-field">
                <Input
                  type="number"
                  name="zip"
                  value={form.zip || ''}
                  onChange={(e) => {
                    updateFormValueSequence({
                      key: e.target.name,
                      value: e.target.value,
                    });
                  }}
                />
              </Control>
            </Field>
            <Field>
              <Label className="msab-has-text-grey">Web Site (optional)</Label>
              <Control className="text-field">
                <Input
                  type="text"
                  name="website"
                  value={form.website || ''}
                  onChange={(e) => {
                    updateFormValueSequence({
                      key: e.target.name,
                      value: e.target.value,
                    });
                  }}
                />
              </Control>
            </Field>
            <Field>
              <Label className="msab-has-text-grey">
                Brief Description (optional - max 250 characters)
              </Label>
              <Subtitle className="msab-has-text-grey-small">
                What do you want people to know about you? (e.g., mission
                statement, description of your art, what you offer, etc.)
              </Subtitle>
              <Control className="text-field">
                <TextArea
                  maxLength="250"
                  name="description"
                  value={form.description || ''}
                  onChange={(e) => {
                    updateFormValueSequence({
                      key: e.target.name,
                      value: e.target.value,
                    });
                  }}
                />
              </Control>
            </Field>
            <Label className="msab-has-text-grey">Type</Label>
            <Subtitle isSize={6} className="msab-has-text-grey">
              (Select up to three that apply)
            </Subtitle>
            {Object.keys(form.category).map((catKey, i) => {
              return (
                <Field key={i}>
                  <Control>
                    <Checkbox
                      name={catKey}
                      checked={form.category[catKey] || false}
                      onChange={(e) => {
                        updateFormValueSequence({
                          key: `category.${catKey}`,
                          value: e.target.checked,
                        });
                      }}
                    />
                    <span className="msab-has-text-grey margin-left-10">
                      {categories[catKey]}
                    </span>
                  </Control>
                </Field>
              );
            })}
            <Field className="msab-margin-top">
              <Label className="msab-has-text-grey">
                Location Image (optional - max size 1 MB)
              </Label>
              <Subtitle className="msab-has-text-grey-small">
                Please choose an image less than 1MB in size and within the file
                types supported: GIF, JPG/JPEG, PNG
              </Subtitle>
              <Control>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={(e) => {
                    setImageSequence({
                      image: e.target.files[0],
                    });
                  }}
                />
              </Control>
              {form.imageURL && !form.base64Image && (
                <Control>
                  <img src={form.imageURL} />
                </Control>
              )}
            </Field>
            {imgFailure && (
              <Notification isColor="danger">{imgMsg}</Notification>
            )}
            <br />
            <Title isSize={4} className="msab-has-text-purple">
              Contact Information
            </Title>
            <Subtitle isSize={5} className="msab-has-text-grey">
              (For internal use only, won’t be published on site)
            </Subtitle>
            <Field>
              <Label className="msab-has-text-grey">Contact Name</Label>
              <Control className="text-field">
                <Input
                  type="text"
                  name="contactName"
                  value={form.contactName || ''}
                  onChange={(e) => {
                    updateFormValueSequence({
                      key: e.target.name,
                      value: e.target.value,
                    });
                  }}
                />
              </Control>
            </Field>
            <Field>
              <Label className="msab-has-text-grey">Contact E-mail</Label>
              <Control className="text-field">
                <Input
                  type="text"
                  name="contactEmail"
                  value={form.contactEmail || ''}
                  onChange={(e) => {
                    updateFormValueSequence({
                      key: e.target.name,
                      value: e.target.value,
                    });
                  }}
                />
              </Control>
            </Field>
            <Field>
              <Label className="msab-has-text-grey">Contact Phone</Label>
              <Control className="text-field">
                <Input
                  type="text"
                  name="contactPhone"
                  value={form.contactPhone || ''}
                  onChange={(e) => {
                    updateFormValueSequence({
                      key: e.target.name,
                      value: e.target.value,
                    });
                  }}
                />
              </Control>
            </Field>
            {locationFormButtonsHelper.showSubmit && (
              <Field>
                <Control>
                  <Checkbox
                    name="ToS"
                    onChange={(e) => {
                      updateFormValueSequence({
                        key: 'ToS',
                        value: e.target.checked,
                      });
                    }}
                  />
                  <span className="msab-has-text-grey margin-left-10">
                    I agree to the{' '}
                    <a href="tos" target="_new">
                      terms of service
                    </a>
                  </span>
                </Control>
              </Field>
            )}
            <Field isGrouped>
              <Control>
                <ReCAPTCHA
                  className="msab-margin-top"
                  sitekey={RECAPTCHA_KEY}
                  onChange={(value) => {
                    updateFormValueSequence({
                      key: 'gresp',
                      value: value,
                    });
                  }}
                  onExpired={(e) => {
                    updateFormValueSequence({
                      key: 'gresp',
                      value: '',
                    });
                  }}
                />
              </Control>
            </Field>
            <Field isGrouped>
              <Control>
                {locationFormButtonsHelper.showAdmin && (
                  <Button
                    type="submit"
                    isColor="primary"
                    className="msab-margin-top"
                    onClick={(e) => {
                      onSubmit(e, true);
                    }}
                  >
                    Publish
                  </Button>
                )}
                {locationFormButtonsHelper.showSubmit && (
                  <Button
                    type="submit"
                    isColor="primary"
                    className="msab-margin-top"
                    disabled={!form.ToS}
                    onClick={(e) => {
                      onSubmit(e, true);
                    }}
                  >
                    Submit
                  </Button>
                )}

                {locationFormButtonsHelper.showUpdate && (
                  <Button
                    type="submit"
                    isColor="primary"
                    className="msab-margin-top"
                    disabled={!form.formDirty}
                    onClick={(e) => {
                      onSubmit(e, true);
                    }}
                  >
                    Update
                  </Button>
                )}

                {locationFormButtonsHelper.showAdmin && (
                  <Field isGrouped>
                    <Control>
                      <Button
                        type="submit"
                        isColor="primary"
                        className="msab-margin-top"
                        onClick={(e) => {
                          onSubmit(e, false);
                        }}
                      >
                        Don't Publish
                      </Button>
                    </Control>
                  </Field>
                )}
              </Control>
            </Field>
          </form>
        </Container>
      </Section>
    );
  },
);
