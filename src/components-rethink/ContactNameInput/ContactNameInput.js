import React, { Component } from 'react';
import { Input, Icon } from 'antd';

// TODO: basic length sanity for input field (max name 100 characters)

class ContactNameInput extends Component {
  render() {
    return (
      <Input
        {...this.props}
        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
        placeholder="Name"
        label="contact-name"
      />
    );
  }
}

export default ContactNameInput;
