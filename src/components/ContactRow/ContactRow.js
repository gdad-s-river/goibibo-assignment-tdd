import React from 'react';
import PropTypes from 'prop-types';

// TODO: Remove this for proper css solution
const tempStyle = { padding: '10px' };
// data-testid s can be removed using a babel plugin in production code if its a concern. It's not a concern for me.
const ContactRow = ({ name, contactNumber }) => (
  <div data-testid="contact-row-container">
    <span data-testid="contact-name" style={tempStyle}>
      {name}
    </span>
    <span style={tempStyle}>{contactNumber}</span>
    <button>Edit</button>
    <button>Delete</button>
  </div>
);

ContactRow.propTypes = {
  name: PropTypes.string.isRequired,
  contactNumber: PropTypes.string.isRequired,
};

export default ContactRow;
