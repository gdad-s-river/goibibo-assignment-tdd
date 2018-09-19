import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'antd';

import { ContactNameInput, ContactNumberInput } from '../index';

import '../../css/global.css';
import 'antd/dist/antd.css';

const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class ContactForm extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  componentDidMount() {
    // to disable button at mount;
    this.props.form.validateFields();
  }

  resetForm() {
    const { validateFields, resetFields } = this.props.form;
    resetFields();
    validateFields();
  }

  handleSubmit = e => {
    e.preventDefault();

    const { getFieldValue, validateFields } = this.props.form;

    // check if the fields were visited; a user can removed 'disable' attribute on submit button

    if (!getFieldValue('contactName') && !getFieldValue('contactNumber')) {
      this.resetForm();
      // couldn't find a way to do it with either ref or state in limited time
      // since this is the unlikeliest of scenarios hacking my way through direct dom change;
      // also the error is not showing here, have to find a way to set correct condition for `validateStatus` and 'help` props
      document.querySelector('.contact-submit').disabled = true;
    }

    validateFields((err, { contactName, contactNumber }) => {
      if (!err) {
        // after validating input field values using regex / custom function
        this.props.onSubmit({ contactName, contactNumber });
        this.resetForm();
      }
    });

    // console.log(this.props.onSubmit);
  };

  handleContactInputChange = e => {
    const contactNoRegex = /^\d{10}$/;

    if (!contactNoRegex.test(e.target.value)) {
      console.log(this.props.form);
      this.props.form.setFieldsValue({
        contactNumber: {
          value: 'yeah science',
        },
      });
    }
  };

  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      isFieldTouched,
      getFieldError,
      // handleSubmit,
    } = this.props.form;

    const contactNameError =
      isFieldTouched('contactName') && getFieldError('contactName');
    const contactNumberError =
      isFieldTouched('contactNumber') && getFieldError('contactNumber');

    return (
      <Form
        onSubmit={this.handleSubmit}
        layout="inline"
        style={{
          height: '30px',
          textAlign: 'center',
          margin: '0 0 10px 0',
        }}
      >
        <FormItem
          validateStatus={contactNameError ? 'error' : ''}
          help={contactNameError || ''}
        >
          {getFieldDecorator('contactName', {
            rules: [{ required: true, message: 'Please input contact name!' }],
          })(<ContactNameInput />)}
        </FormItem>
        <FormItem
          validateStatus={contactNumberError ? 'error' : ''}
          help={contactNumberError || ''}
        >
          {getFieldDecorator('contactNumber', {
            rules: [
              {
                required: true,
                message: 'Please input contact number!',
                // validator: this.checkContactNumber
              },
            ],
            onChange: this.handleContactInputChange,
          })(<ContactNumberInput />)}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
            className="contact-submit"
            data-testid="add-contact-btn"
          >
            Save Contact
          </Button>
        </FormItem>
      </Form>
    );
  }
}

// const ContactAddForm = Form.create()(ContactForm);

const ContactAddForm = ({ onSubmit }) => {
  const ContactFormWithSubmitProp = props => (
    <ContactForm {...props} onSubmit={onSubmit} />
  );
  const DecoratedContactForm = Form.create()(ContactFormWithSubmitProp);

  return <DecoratedContactForm />;
};

ContactAddForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactAddForm;
