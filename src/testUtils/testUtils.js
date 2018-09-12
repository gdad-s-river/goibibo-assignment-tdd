import * as faker from 'faker';

function addContact({ name, contactNumber }, { getByLabelText, getByText }) {
  getByLabelText(/Name/i).value = name;
  getByLabelText(/Contact Number/i).value = contactNumber;

  // covers accessible actions of other kinds of submit, like through keyboard enter, since it is a form submit
  getByText(/Save Contact/i).click();
}

const generateFakeName = () => {
  return faker.name.findName();
};

const generateFakeContactNumber = () => faker.phone.phoneNumber('0#########');

const generateFakeContactNumberWithPattern = pattern =>
  faker.phone.phoneNumber(pattern);

export {
  addContact,
  generateFakeContactNumber,
  generateFakeName,
  generateFakeContactNumberWithPattern,
};
