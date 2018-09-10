import React, { Component } from 'react';

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
        Name
        <input type="text" name="name" id="name" />
      </label>
      <label htmlFor="contact-number">
        Contact Number
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

export default ContactInput;
