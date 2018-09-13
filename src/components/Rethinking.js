import React, { Component } from 'react';
import { Input, Icon, Form, Button } from 'antd';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';
import { immutableSort, sortByName } from '../utils';

import EditableTable from './Contacts';

import '../css/global.css';
import 'antd/dist/antd.css';

const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

// eslint-disable-next-line
const Label = ({ text, forId }) => <label htmlFor={forId}>{text}</label>;
Label.propTypes = {
  text: PropTypes.string.isRequired,
  forId: PropTypes.string.isRequired,
};

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

class ContactNumberInput extends Component {
  render() {
    return (
      <Input
        {...this.props}
        prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
        type="tel"
        placeholder="Number"
      />
    );
  }
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
          margin: '-20rem 0 2rem 0',
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
              { required: true, message: 'Please input contact number!' },
            ],
          })(<ContactNumberInput />)}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
            className="contact-submit"
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
  const A = props => <ContactForm onSubmit={onSubmit} {...props} />;
  const B = Form.create()(A);

  return <B />;
};

ContactAddForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

// const dumData = [];
// for (let i = 0; i < 100; i++) {
//   dumData.push({
//     key: i.toString(),
//     contactName: `Arihant ${i}`,
//     contactPhone: `821913${i}`,
//   });
// }

class App extends Component {
  state = {
    contacts: [],
  };

  addContact({ contactName, contactNumber }) {
    // this.state.contacts.push({ name, contactNumber });
    this.setState(prevState => {
      return {
        contacts: immutableSort(
          [
            ...prevState.contacts,
            {
              key: contactNumber,
              contactName,
              contactNumber,
            },
          ],
          sortByName,
        ),
      };
    });
  }

  handleSubmit = ({ contactName, contactNumber }) => {
    this.addContact({ contactName, contactNumber, key: v4() });
  };

  onSave = newData => {
    this.setState({ contacts: immutableSort(newData, sortByName) });
  };

  render() {
    return (
      <div className="app-container">
        <ContactAddForm onSubmit={this.handleSubmit} />
        <EditableTable data={this.state.contacts} onSave={this.onSave} />
      </div>
    );
  }
}

export default App;
