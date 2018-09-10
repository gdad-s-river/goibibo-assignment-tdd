import React from 'react';
import { render, cleanup } from 'react-testing-library';
import ContactInput from '..';

afterEach(cleanup);

test('check for invalid number onChange of getByLabelText(/Contact Number/i) input', () => {
  //
});

test('calls onSubmit with contact number', () => {
  const handleSubmit = jest.fn();
  const { getByLabelText, getByText } = render(
    <ContactInput onSubmit={handleSubmit} />,
  );

  getByLabelText(/Contact Number/i).value = '8219133519';
  getByLabelText(/Name/i).value = 'Arihant';
  // covers accessible actions of other kinds of submit, like through keyboard enter, since it is a form submit
  getByText(/Save Contact/i).click();

  expect(handleSubmit).toHaveBeenCalledTimes(1);
  expect(handleSubmit).toHaveBeenCalledWith({
    name: 'Arihant',
    contactNumber: '8219133519',
  });
});

// see if this test needs to be here or in other component's test file
test('when a row of contact number is edited, label of #add-edit-contact should be "Edit"', () => {
  //
});
