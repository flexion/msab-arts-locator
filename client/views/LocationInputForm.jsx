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
  Select,
} from 'bloomer';

export const LocationInputForm = connect(
  {
    form: state.form,
    submitLocation: sequences.submitLocation,
    updateFormValueSequence: sequences.updateFormValueSequence,
  },
  ({ form, submitLocation, updateFormValueSequence }) => {
    /*

Location Name
Location Phone Number - Optional?
Category/Discipline - multiple select
Address - Street address, City, State, Zip
Photo
URL - Optional?
Contact person
Contact Email
Contact phone
? Description ?*/

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
              <Label className="has-text-white">Artist Name</Label>
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
              <Label className="has-text-white">Location Name</Label>
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
              <Label className="has-text-white">Website URL</Label>
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
              <Label className="has-text-white">Street Address</Label>
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
              <Label className="has-text-white">City</Label>
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
              <Label className="has-text-white">State</Label>
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
              <Label className="has-text-white">Zip</Label>
              <Control>
                <Input
                  isColor="success"
                  name="zip"
                  value={form.zip || 'MN'}
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
              <Label className="has-text-white">Categories:</Label>
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
            <Field>
              <Label className="has-text-white">Contact Name</Label>
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
              <Label className="has-text-white">Contact Phone</Label>
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
              <Label className="has-text-white">Contact Email</Label>
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
