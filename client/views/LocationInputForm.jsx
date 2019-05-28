import { connect } from '@cerebral/react';
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
} from 'bloomer';

export const LocationInputForm = connect(
  {
    form: state.form,
    submitLocation: sequences.submitLocation,
    updateFormValueSequence: sequences.updateFormValueSequence,
  },
  ({ form, submitLocation, updateFormValueSequence }) => {
    return (
      <Section className="msab-has-background-grey">
        <Container>
          <Title isSize={3} className="has-text-white">
            Enter in your Art Location
          </Title>

          <form
            className="search"
            id="add-location-form"
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              submitLocation();
            }}
          >
            <Field>
              <Label>Artist Name</Label>
              <Control>
                <Input
                  type="text"
                  name="artistName"
                  value={form.artistName || ''}
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
              <Label>Location Name</Label>
              <Control>
                <Input
                  type="text"
                  name="locationName"
                  value={form.locationName || ''}
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
              <Label>Phone Number</Label>
              <Control>
                <Input
                  isColor="success"
                  name="phoneNumber"
                  value={form.phoneNumber || ''}
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
              <Label>Categories:</Label>
              <Control>
                <Select
                  name="category"
                  value={form.category || ''}
                  onChange={(e) => {
                    updateFormValueSequence({
                      key: e.target.name,
                      value: e.target.value,
                    });
                  }}
                >
                  <option>Dance</option>
                  <option>Music</option>
                  <option>Theater/Opera</option>
                  <option>Visual</option>
                  <option>Craft/Textiles</option>
                  <option>Photography/Film/Media</option>
                  <option>Folk/Tradition</option>
                  <option>Literary</option>
                </Select>
              </Control>
            </Field>
            <Field isGrouped>
              <Control>
                <Button isColor="primary">Submit</Button>
              </Control>
            </Field>
          </form>
        </Container>
      </Section>
    );
  },
);
