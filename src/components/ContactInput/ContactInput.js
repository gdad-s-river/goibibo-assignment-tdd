import React from 'react';
import PropTypes from 'prop-types';

// label would be either 'Add', or 'Edit'

// TODO:
// only allow numerals
// validation check in javascript as well
// check if the number already exists, if it does, tell the user
// user shouldn't be able to submit if either name or contact is empty

class ContactInput extends React.Component {
  state = {
    contactNumber: '',
    // errors: {},
  };

  handleChange = e => {
    // console.log('yeah science!');
    // console.log(e.target.value);
    // check if the user hasn't entered anything other than a number, only then do the following
    // TODO: remove this: abhi fake thing just to test control vs uncontrolled
    if (!e.target.value.includes('a')) {
      this.setState({ contactNumber: e.target.value });
    }
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <form
          onSubmit={e => {
            e.preventDefault();
            const {
              'contact-number': contactInput,
              name: nameInput,
            } = e.target.elements;

            handleSubmit({
              name: nameInput.value,
              contactNumber: contactInput.value,
            });

            contactInput.value = '';
            nameInput.value = '';
          }}
        >
          <label htmlFor="name">
            <span>Name</span>
            <input type="text" name="name" id="name" />
          </label>
          <label htmlFor="contact-number">
            <span>Contact Number</span>
            <input
              type="tel"
              id="contact-number"
              name="contact-number"
              placeholder="8219133519"
              pattern="[1-9]{1}[0-9]{9}"
              minLength="10"
              maxLength="10"
              required
              onChange={this.handleChange}
              value={this.state.contactNumber}
            />
          </label>

          <button type="submit">Save Contact</button>
        </form>
      </div>
    );
  }
}

ContactInput.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default ContactInput;
