import React from 'react';
import { render, waitForElement } from 'react-testing-library';
import * as faker from 'faker';
import isEqual from 'lodash/isEqual';
import App from '../';
import { shuffleArray, immutableSort, sortByName } from '../../../utils';

const generateFakeName = () => {
  return faker.name.findName();
};

const generateFakeContactNumber = () => {
  return faker.phone.phoneNumber('0##########');
};

// generally testing principle:arrange, act, assert
// TODO: instead of hard coded contact name and number, use a generator

// see if this test needs to be here or in other component's test file

function addContact({ name, contactNumber }, { getByLabelText, getByText }) {
  getByLabelText(/Name/i).value = name;
  getByLabelText(/Contact Number/i).value = contactNumber;

  // covers accessible actions of other kinds of submit, like through keyboard enter, since it is a form submit
  getByText(/Save Contact/i).click();
}

test(`when Save Contact Button is pushed, it contact row should be added`, async () => {
  const { getByLabelText, getByText, getByTestId } = render(<App />);

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

  // since setState is async, we need to wait for the columnn row to show up

  await waitForElement(() => getByTestId('contact-row-container'));

  expect(getByText(fakeName)).toBeInTheDocument();
  expect(getByText(fakeContactNumber)).toBeInTheDocument();

  // const element = getByText('Arihant');
  // console.log(element);
});

test('contact names should be in alphabetical order', async () => {
  const { getByLabelText, getByText, getAllByTestId } = render(<App />);
  const fakeContactData = [];
  for (let i = 0; i < 5; i++) {
    fakeContactData.push({
      name: generateFakeName(),
      contactNumber: generateFakeContactNumber(),
    });
  }

  // to ensure we test the sort better
  const shuffledContactData = shuffleArray(fakeContactData);

  // shuffledContactData.forEach(async ({ name, contactNumber }) => {
  //   addContact({ name, contactNumber }, { getByLabelText, getByText });
  //   await waitForElement(() => getByText(contactNumber));
  // });

  const unresolvedPromisesForElements = [];
  for (const { name, contactNumber } of shuffledContactData) {
    addContact({ name, contactNumber }, { getByLabelText, getByText });
    unresolvedPromisesForElements.push(
      waitForElement(() => getByText(contactNumber)),
    );
  }

  await Promise.all(unresolvedPromisesForElements);

  const orderedFakeContactData = immutableSort(shuffledContactData, sortByName);

  const contactNamesInDOM = getAllByTestId('contact-name');

  const namesOfContactsInDOM = contactNamesInDOM.map(
    contactNameDOMNode => contactNameDOMNode.textContent,
  );

  const expectedNamesOfContactsInDOM = orderedFakeContactData.map(
    contactObj => contactObj.name,
  );

  expect(isEqual(namesOfContactsInDOM, expectedNamesOfContactsInDOM)).toBe(
    true,
  );

  // expect(namesOfContactsInDOM).toEqual()
});

test(`when a row of contact number is edited, label of #add-edit-contact should be "Edit"`, () => {
  //
});
