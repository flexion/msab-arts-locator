import {
  Button,
  Checkbox,
  Container,
  Control,
  Field,
  Input,
  Label,
  Notification,
  Section,
  Subtitle,
  TextArea,
  Title,
} from 'bloomer';
import { RECAPTCHA_KEY } from '../config/config';
import { connect } from '@cerebral/react';
import { sequences, state } from 'cerebral';
import ReCAPTCHA from 'react-google-recaptcha';
import React from 'react';

export const LocationInputForm = connect(
  {
    categories: state.categories,
    form: state.form,
    imgFailure: state.selectImageFailure,
    imgMsg: state.selectImageMsg,
    locationFormButtonsHelper: state.locationFormButtonsHelper,
    setImageSequence: sequences.setImageSequence,
    submitLocation: sequences.submitLocationSequence,
    updateFormValueSequence: sequences.updateFormValueSequence,
  },
  ({
    categories,
    form,
    imgFailure,
    imgMsg,
    locationFormButtonsHelper,
    setImageSequence,
    submitLocation,
    updateFormValueSequence,
  }) => {
    const onSubmit = e => {
      e.preventDefault();
      submitLocation();
    };

    return (
      <Section className="msab-section-form">
        <Container>
          <Title className="msab-has-text-purple" isSize={3}>
            Submit Your Arts Location
          </Title>
          <Subtitle className="msab-has-text-grey" isSize={5}>
            Fill out this form and a Minnesota State Arts Board administrator
            will review it before publishing.
          </Subtitle>
          <Subtitle className="msab-has-text-grey-bold" isSize={6}>
            * All fields required unless otherwise noted
          </Subtitle>
          <Title className="msab-has-text-purple" isSize={4}>
            Your Location
          </Title>
          <form noValidate className="search" id="add-location-form">
            <Field>
              <Label className="msab-has-text-grey" htmlFor="name">
                Name
              </Label>
              <Subtitle className="msab-has-text-grey-small">
                How do you want people to know and find you? (e.g., your legal
                name, your publicity name, a DBA, a pen name, etc.)
              </Subtitle>
              <Control className="text-field">
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name || ''}
                  onChange={e => {
                    updateFormValueSequence({
                      key: e.target.name,
                      value: e.target.value,
                    });
                  }}
                />
              </Control>
            </Field>
            <Field>
              <Label className="msab-has-text-grey" htmlFor="street">
                Street Address
              </Label>
              <Subtitle className="msab-has-text-grey-small">
                Where do you want people to find you and potentially visit?
                (e.g., a performance venue, your studio, retail location, etc.)
              </Subtitle>
              <Control className="text-field">
                <Input
                  id="street"
                  name="street"
                  type="text"
                  value={form.street || ''}
                  onChange={e => {
                    updateFormValueSequence({
                      key: e.target.name,
                      value: e.target.value,
                    });
                  }}
                />
              </Control>
            </Field>
            <Field>
              <Label className="msab-has-text-grey" htmlFor="city">
                Town/City
              </Label>
              <Control className="text-field">
                <Input
                  id="city"
                  name="city"
                  type="text"
                  value={form.city || ''}
                  onChange={e => {
                    updateFormValueSequence({
                      key: e.target.name,
                      value: e.target.value,
                    });
                  }}
                />
              </Control>
            </Field>
            <Field>
              <Label className="msab-has-text-grey" htmlFor="zip">
                ZIP
              </Label>
              <Control className="text-field">
                <Input
                  id="zip"
                  name="zip"
                  type="number"
                  value={form.zip || ''}
                  onChange={e => {
                    updateFormValueSequence({
                      key: e.target.name,
                      value: e.target.value,
                    });
                  }}
                />
              </Control>
            </Field>
            <Field>
              <Label className="msab-has-text-grey" htmlFor="website">
                Web Site (optional)
              </Label>
              <Control className="text-field">
                <Input
                  id="website"
                  name="website"
                  type="text"
                  value={form.website || ''}
                  onChange={e => {
                    updateFormValueSequence({
                      key: e.target.name,
                      value: e.target.value,
                    });
                  }}
                />
              </Control>
            </Field>
            <Field>
              <Label className="msab-has-text-grey" htmlFor="description">
                Brief Description (optional - max 250 characters)
              </Label>
              <Subtitle className="msab-has-text-grey-small">
                What do you want people to know about you? (e.g., mission
                statement, description of your art, what you offer, etc.)
              </Subtitle>
              <Control className="text-field">
                <TextArea
                  id="description"
                  maxLength="250"
                  name="description"
                  value={form.description || ''}
                  onChange={e => {
                    updateFormValueSequence({
                      key: e.target.name,
                      value: e.target.value,
                    });
                  }}
                />
              </Control>
            </Field>
            <span className="label msab-has-text-grey">Type</span>
            <Subtitle className="msab-has-text-grey" isSize={6}>
              (Select up to three that apply)
            </Subtitle>
            {Object.entries(form.category).map(([catKey, value]) => {
              return (
                <Field key={categories[catKey]}>
                  <Control>
                    <Checkbox
                      checked={value || false}
                      name={catKey}
                      onChange={e => {
                        updateFormValueSequence({
                          key: `category.${catKey}`,
                          value: e.target.checked,
                        });
                      }}
                    >
                      <span className="msab-has-text-grey margin-left-10">
                        {categories[catKey]}
                      </span>
                    </Checkbox>
                  </Control>
                </Field>
              );
            })}
            <Field className="msab-margin-top">
              <Label className="msab-has-text-grey" htmlFor="image">
                Location Image (optional - max size 1 MB)
              </Label>
              <Subtitle className="msab-has-text-grey-small">
                Please choose an image less than 1MB in size and within the file
                types supported: GIF, JPG/JPEG, PNG
              </Subtitle>
              <Control>
                <input
                  id="image"
                  name="image"
                  type="file"
                  onChange={e => {
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
            <Title className="msab-has-text-purple" isSize={4}>
              Contact Information
            </Title>
            <Subtitle className="msab-has-text-grey" isSize={5}>
              (For internal use only, won’t be published on site)
            </Subtitle>
            <Field>
              <Label className="msab-has-text-grey" htmlFor="contactName">
                Contact Name
              </Label>
              <Control className="text-field">
                <Input
                  id="contactName"
                  name="contactName"
                  type="text"
                  value={form.contactName || ''}
                  onChange={e => {
                    updateFormValueSequence({
                      key: e.target.name,
                      value: e.target.value,
                    });
                  }}
                />
              </Control>
            </Field>
            <Field>
              <Label className="msab-has-text-grey" htmlFor="contactEmail">
                Contact E-mail
              </Label>
              <Control className="text-field">
                <Input
                  id="contactEmail"
                  name="contactEmail"
                  type="text"
                  value={form.contactEmail || ''}
                  onChange={e => {
                    updateFormValueSequence({
                      key: e.target.name,
                      value: e.target.value,
                    });
                  }}
                />
              </Control>
            </Field>
            <Field>
              <Label className="msab-has-text-grey" htmlFor="contactPhone">
                Contact Phone
              </Label>
              <Control className="text-field">
                <Input
                  id="contactPhone"
                  name="contactPhone"
                  type="text"
                  value={form.contactPhone || ''}
                  onChange={e => {
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
                    id="tos"
                    name="ToS"
                    onChange={e => {
                      updateFormValueSequence({
                        key: 'ToS',
                        value: e.target.checked,
                      });
                    }}
                  />
                  <Label
                    className="msab-has-text-grey margin-left-10"
                    htmlFor="tos"
                  >
                    I agree to the{' '}
                    <a href="tos" target="_new">
                      terms of service
                    </a>
                  </Label>
                </Control>
              </Field>
            )}
            <Field isGrouped>
              <Control>
                <ReCAPTCHA
                  className="msab-margin-top"
                  sitekey={RECAPTCHA_KEY}
                  onChange={value => {
                    updateFormValueSequence({
                      key: 'gresp',
                      value,
                    });
                  }}
                  onExpired={() => {
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
                    className="msab-margin-top"
                    isColor="primary"
                    type="submit"
                    onClick={e => {
                      onSubmit(e);
                    }}
                  >
                    Publish
                  </Button>
                )}
                {locationFormButtonsHelper.showSubmit && (
                  <Button
                    className="msab-margin-top"
                    disabled={!form.ToS}
                    isColor="primary"
                    type="submit"
                    onClick={e => {
                      onSubmit(e);
                    }}
                  >
                    Submit
                  </Button>
                )}

                {locationFormButtonsHelper.showUpdate && (
                  <Button
                    className="msab-margin-top"
                    disabled={!form.formDirty}
                    isColor="primary"
                    type="submit"
                    onClick={e => {
                      onSubmit(e);
                    }}
                  >
                    Update
                  </Button>
                )}

                {locationFormButtonsHelper.showAdmin && (
                  <Field isGrouped>
                    <Control>
                      <Button
                        className="msab-margin-top"
                        isColor="primary"
                        type="submit"
                        onClick={e => {
                          onSubmit(e);
                        }}
                      >
                        Don&apos;t Publish
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
