import React, { Component } from 'react';
import { v4 } from 'uuid';
import { ContactAddForm, EditableTable } from '../index';
import { immutableSort, sortByName } from '../../utils/';

// import { EditableContext } from '../EditableTable/EditableTable';

// import React from 'react';
// import 'antd/dist/antd.css';
// import { Table, Input, Popconfirm, Form } from 'antd';

class App extends Component {
  state = {
    contacts: [],
  };

  addContact({ contactName, contactNumber }) {
    // this.state.contacts.push({ name, contactNumber });
    this.setState(prevState => {
      const newData = [
        ...prevState.contacts,
        {
          key: contactNumber,
          contactName,
          contactNumber,
        },
      ];

      return {
        contacts: immutableSort(newData, sortByName),
      };
    });
  }

  handleSubmit = ({ contactName, contactNumber }) => {
    if (!contactName || !contactNumber) {
      // eslint-disable-next-line
      console.log('either of contact name or number isnt passed');
      return;
    }

    // TODO: make a utility and reuse it
    const contactNoRegex = /^\d{10}$/;

    if (!contactNoRegex.test(contactNumber)) {
      // eslint-disable-next-line
      console.log('number didnt match regex');
      return;
    }

    this.addContact({ contactName, contactNumber, key: v4() });
  };

  onSave = newData => {
    this.setState({ contacts: immutableSort(newData, sortByName) });
  };

  onDelete = afterDeleteData => {
    this.setState({ contacts: afterDeleteData });
  };

  render() {
    return (
      <div className="app-container">
        <ContactAddForm onSubmit={this.handleSubmit} />
        <EditableTable
          data={this.state.contacts}
          onSave={this.onSave}
          onDelete={this.onDelete}
          data-testid="contacts-table"
        />
      </div>
    );
  }
}

export default App;
