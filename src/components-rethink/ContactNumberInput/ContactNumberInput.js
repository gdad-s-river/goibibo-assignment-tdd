import React, { Component } from 'react';
import { Input, Icon } from 'antd';

class ContactNumberInput extends Component {
  state = {
    // contactNumber: '',
  };

  handleChange = e => {
    const numberInputValue = e.target.value;

    // this.setState({ contactNumber: numberInputValue });
    // check for 10 digit number and alphabets here;

    const contactNoRegex = /^\d{10}$/;

    const isNumber = /^\d+$/.test(numberInputValue);

    // the next character is an number and *not an empty string* (useful while backspacing to '' inside input)
    if (!isNumber && !!numberInputValue) {
      return;
    }

    // TODO: remove magic number 10
    if (
      numberInputValue.length >= 10 &&
      !contactNoRegex.test(numberInputValue)
    ) {
      // this.props.form.setFieldsValue({
      //   contactNumber: {
      //     value: numberInputValue,
      //     errors: [new Error('Please enter a 10 digit number')],
      //   },
      // });

      return;
    }

    this.props.form.setFieldsValue({ contactNumber: numberInputValue });

    // console.log(contactNoRegex.test());
  };

  render() {
    return (
      <Input
        {...this.props}
        prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
        type="tel"
        placeholder="Number"
        onChange={this.handleChange}
        // value={this.state.contactNumber}
      />
    );
  }
}

export default ContactNumberInput;
