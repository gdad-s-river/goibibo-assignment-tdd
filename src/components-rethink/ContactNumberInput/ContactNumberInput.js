import React, { Component } from 'react';
import { Input, Icon } from 'antd';

class ContactNumberInput extends Component {
  state = {
    contactNumber: '',
  };

  handleChange = e => {
    // put checks here
    // const
    this.setState({ contactNumber: e.target.value });
  };

  render() {
    return (
      <Input
        {...this.props}
        prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
        type="tel"
        placeholder="Number"
        // onChange={this.handleChange}
        // value={this.state.contactNumber}
      />
    );
  }
}

export default ContactNumberInput;
