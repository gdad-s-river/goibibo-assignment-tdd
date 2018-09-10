import React, { Component } from 'react';
import { ContactInput, ContactRow, ErrorBoundary } from '..';
import { immutableSort, sortByName } from '../../utils';

// TODO:
// add an error boundary
// optimisations for long list ? react virtualised?

class App extends Component {
  state = {
    contacts: [],
  };

  addContact = ({ name, contactNumber }) => {
    // this.state.contacts.push({ name, contactNumber });
    this.setState(prevState => {
      return {
        contacts: immutableSort(
          [...prevState.contacts, { name, contactNumber }],
          sortByName,
        ),
      };
    });
  };

  handleContactSubmit = ({ name, contactNumber }) => {
    this.addContact({ name, contactNumber });
  };

  render() {
    return (
      <ErrorBoundary>
        <ContactInput
          handleSubmit={({ name, contactNumber }) => {
            this.handleContactSubmit({ name, contactNumber });
          }}
        />
        <ul className="contacts">
          {this.state.contacts.map(({ name, contactNumber }) => (
            <li key={contactNumber}>
              <ContactRow name={name} contactNumber={contactNumber} />
            </li>
          ))}
        </ul>
      </ErrorBoundary>
    );
  }
}

export default App;
