import React from 'react';
import { ContactInput } from './components';

const App = (
  <ContactInput
    onSubmit={(name, contactNumber) => {
      console.log(name, contactNumber);
    }}
  />
);

export default App;
