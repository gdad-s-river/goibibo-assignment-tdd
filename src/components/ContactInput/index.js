import React from 'react';
import PropTypes from 'prop-types';

// label would be either 'Add', or 'Edit'

// TODO:
// only allow numerals
// validation check in javascript as well

const ContactInput = ({ onSubmit }) => (
  <div>
    <form
      onSubmit={e => {
        e.preventDefault();
        const {
          'contact-number': contactInput,
          name: nameInput,
        } = e.target.elements;

        onSubmit({
          name: nameInput.value,
          contactNumber: contactInput.value,
        });
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
          // pattern=""
          minLength="10"
          maxLength="11"
          required
        />
      </label>

      <button type="submit">Save Contact</button>
    </form>
  </div>
);

ContactInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactInput;
