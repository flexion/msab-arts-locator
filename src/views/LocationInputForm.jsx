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
} from 'bloomer';

export const LocationInputForm = connect(
  {
    form: state.form,
    submitLocation: sequences.submitLocationSequence,
    updateFormValueSequence: sequences.updateFormValueSequence,
  },
  ({ form, submitLocation, updateFormValueSequence }) => {
    return (
      <Section>
        <Container>
          <Title isSize={4} className="msab-has-text-purple">
            Submit Your Arts Location
          </Title>
          <Subtitle isSize={5} className="msab-has-text-grey">
            Fill out this form and a Minnesota State Arts Board administrator
            will review it before publishing.
          </Subtitle>
          <Subtitle isSize={6} className="msab-has-text-grey bold">
            * All fields required unless otherwise noted
          </Subtitle>
          <br />
          <Title isSize={5} className="msab-has-text-purple">
            Your Location
          </Title>
          <form
            className="search"
            id="add-location-form"
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              const gresp = grecaptcha.getResponse();
              if (gresp) {
                updateFormValueSequence({
                  key: 'gresp',
                  value: gresp,
                });
                submitLocation();
              }
            }}
          >
            <Field>
              <Label className="msab-has-text-grey">Name</Label>
              <Control>
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
              <Control>
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
              <Control>
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
              <Label className="msab-has-text-grey">State</Label>
              <Control>
                <Input
                  isColor="success"
                  name="state"
                  value={form.state || 'MN'}
                  disabled
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
              <Label className="msab-has-text-grey">Zip</Label>
              <Control>
                <Input
                  type="number"
                  isColor="success"
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
              <Label className="msab-has-text-grey">Web Site (Optional)</Label>
              <Control>
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
                Brief Description (Optional)
              </Label>
              <Subtitle isSize={6} className="msab-has-text-grey">
                (Max 250 Characters)
              </Subtitle>
              <Control>
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
            <Label className="msab-has-text-grey">Categories:</Label>
            <Subtitle isSize={6} className="msab-has-text-grey">
              (Select up to three that apply)
            </Subtitle>
            <Field>
              <Control>
                <Checkbox
                  name="dance"
                  checked={form.category.dance || false}
                  onChange={(e) => {
                    updateFormValueSequence({
                      key: e.target.name,
                      value: e.target.value,
                    });
                  }}
                />
                <span className="msab-has-text-grey bold margin-left-10">
                  Dance
                </span>
              </Control>
            </Field>
            <Field>
              <Control>
                <Checkbox
                  name="music"
                  checked={form.category.music || false}
                  onChange={(e) => {
                    updateFormValueSequence({
                      key: e.target.name,
                      value: e.target.value,
                    });
                  }}
                />
                <span className="msab-has-text-grey bold margin-left-10">
                  Music
                </span>
              </Control>
            </Field>
            <Field>
              <Control>
                <Checkbox
                  name="opera"
                  checked={form.category.opera || false}
                  onChange={(e) => {
                    updateFormValueSequence({
                      key: e.target.name,
                      value: e.target.value,
                    });
                  }}
                />
                <span className="msab-has-text-grey bold margin-left-10">
                  Theater/Opera
                </span>
              </Control>
            </Field>
            <Field>
              <Control>
                <Checkbox
                  name="visual"
                  checked={form.category.visual || false}
                  onChange={(e) => {
                    updateFormValueSequence({
                      key: e.target.name,
                      value: e.target.value,
                    });
                  }}
                />
                <span className="msab-has-text-grey bold margin-left-10">
                  Visual
                </span>
              </Control>
            </Field>
            <Field>
              <Control>
                <Checkbox
                  name="craft"
                  checked={form.category.craft || false}
                  onChange={(e) => {
                    updateFormValueSequence({
                      key: e.target.name,
                      value: e.target.value,
                    });
                  }}
                />{' '}
                <span className="msab-has-text-grey bold margin-left-10">
                  Craft/Textiles
                </span>
              </Control>
            </Field>
            <Field>
              <Control>
                <Checkbox
                  name="photo"
                  checked={form.category.photo || false}
                  onChange={(e) => {
                    updateFormValueSequence({
                      key: e.target.name,
                      value: e.target.value,
                    });
                  }}
                />
                <span className="msab-has-text-grey bold margin-left-10">
                  Photography/Film/Media
                </span>
              </Control>
            </Field>
            <Field>
              <Control>
                <Checkbox
                  name="folk"
                  checked={form.category.folk || false}
                  onChange={(e) => {
                    updateFormValueSequence({
                      key: e.target.name,
                      value: e.target.value,
                    });
                  }}
                />
                <span className="msab-has-text-grey bold margin-left-10">
                  Folk/Traditional
                </span>
              </Control>
            </Field>
            <Field>
              <Control>
                <Checkbox
                  name="literary"
                  checked={form.category.literary || false}
                  onChange={(e) => {
                    updateFormValueSequence({
                      key: e.target.name,
                      value: e.target.value,
                    });
                  }}
                />
                <span className="msab-has-text-grey bold margin-left-10">
                  Literary
                </span>
              </Control>
            </Field>
            <br />
            <br />
            <Title isSize={4} className="msab-has-text-purple">
              Contact Information
            </Title>
            <Subtitle isSize={5} className="msab-has-text-grey">
              (For internal use only, won’t be published on site)
            </Subtitle>
            <Field>
              <Label className="msab-has-text-grey">Contact Name</Label>
              <Control>
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
              <Control>
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
              <Control>
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
            <Field>
              <Label className="msab-has-text-grey">
                Location Image (Optional)
              </Label>
              <Control>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={(e) => {
                    updateFormValueSequence({
                      key: 'image',
                      value: e.target.files[0],
                    });
                  }}
                />
              </Control>
            </Field>
            <Field isGrouped>
              <Control>
                <ReCAPTCHA
                  sitekey="6LfpgakUAAAAAExacnxuT4JdaEfOa3KUmH_qK31_"
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

                <Button type="submit" isColor="primary">
                  Submit
                </Button>
              </Control>
            </Field>
          </form>
        </Container>
      </Section>
    );
  },
);
