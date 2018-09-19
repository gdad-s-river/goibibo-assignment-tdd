import React, { Component } from 'react';
import { Input, Icon } from 'antd';

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
