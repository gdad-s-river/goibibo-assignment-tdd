import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import {
  addContact,
  generateFakeContactNumber,
  generateFakeName,
  generateFakeContactNumberWithPattern,
} from 'testUtils';
import ContactInput from '../ContactInput';

// afterEach(cleanup);

test('Form input get cleared after submitting', () => {});
test(`submit callback doesn't get called when either of the inputs are empty`, () => {});

test('check for invalid number onChange of getByLabelText(/Contact Number/i) input', () => {
  const handleSubmit = jest.fn();
  // ContactInput.prototype.handleChange = jest.fn();

  const { getByLabelText } = render(
    <ContactInput handleSubmit={handleSubmit} />,
  );

  // const fakeName = generateFakeName();
  const fakeContactNumber = generateFakeContactNumber();
  const contactNumberElement = getByLabelText(/Contact Number/i);

  // https://github.com/facebook/react/issues/10135#issuecomment-314441175
  // https://github.com/facebook/react/issues/10135#issuecomment-401496776 (Kent's Comment)

  // discussion over this for react-testing-library
  // https://github.com/kentcdodds/react-testing-library/pull/153
  // https://github.com/kentcdodds/dom-testing-library/pull/85

  fireEvent.change(contactNumberElement, {
    target: { value: fakeContactNumber },
  });

  // expect(ContactInput.prototype.handleChange).toHaveBeenCalledTimes(1);
});

test('calls onSubmit with contact number', () => {
  const handleSubmit = jest.fn();
  const { getByLabelText, getByText } = render(
    <ContactInput handleSubmit={handleSubmit} />,
  );

  const fakeName = generateFakeName();
  const fakeContactNumber = generateFakeContactNumber();

  addContact(
    {
      name: fakeName,
      contactNumber: fakeContactNumber,
    },
    {
      getByLabelText,
      getByText,
    },
  );

  expect(handleSubmit).toHaveBeenCalledTimes(1);
  expect(handleSubmit).toHaveBeenCalledWith({
    name: fakeName,
    contactNumber: fakeContactNumber,
  });
});
