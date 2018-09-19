import React from 'react';

import { render, fireEvent, wait, waitForElement } from 'react-testing-library';

import { generateFakeName, generateFakeContactNumber } from 'testUtils';

import ContactAddForm from '../ContactAddForm';

test(`Form input only takes numbers, and max and min 10`, () => {});

test('Form input get cleared after submitting', () => {
  //
});

test('Correct `disabled` attribute values expected on change of name and contact inputs ', () => {
  const onSubmit = jest.fn();

  const { getByPlaceholderText, getByTestId, getByValue } = render(
    <ContactAddForm onSubmit={onSubmit} />,
  );

  const fakeName = generateFakeName();
  const fakeContactNumber = generateFakeContactNumber();

  const nameInput = getByPlaceholderText(/Name/i);
  const contactInput = getByPlaceholderText(/Number/i);
  const submitBtn = getByTestId('add-contact-btn');

  // before nameInput and contactInput are filled; submit button
  // should be disabled

  expect(submitBtn.disabled).toBe(true);

  fireEvent.change(nameInput, { target: { value: fakeName } });
  wait(() => getByValue(fakeName));

  // when only nameinput is filled but not contactInput
  // the btn should be disabled still

  expect(submitBtn.disabled).toBe(true);

  fireEvent.change(contactInput, {
    target: {
      value: fakeContactNumber,
    },
  });

  wait(() => getByValue(fakeContactNumber));

  // when both are filled, the button should *not* be disabled

  expect(submitBtn.disabled).toBe(false);

  // bring this into another test
});

test.skip('onSubmit callback function should be called after the form is submitted', () => {
  const onSubmit = jest.fn();

  const { getByPlaceholderText, getByTestId, getByText } = render(
    <ContactAddForm onSubmit={onSubmit} />,
  );

  const fakeName = generateFakeName();
  const fakeContactNumber = generateFakeContactNumber();

  const nameInput = getByPlaceholderText(/Name/i);
  const contactInput = getByPlaceholderText(/Number/i);
  const submitBtn = getByTestId('add-contact-btn');

  fireEvent.change(nameInput, { target: { value: fakeName } });

  waitForElement(() => getByText(fakeName));

  fireEvent.change(contactInput, {
    target: {
      value: fakeContactNumber,
    },
  });

  waitForElement(() => getByText(fakeName));

  fireEvent.submit(submitBtn);

  expect(onSubmit).toHaveBeenCalledTimes(1);
});
