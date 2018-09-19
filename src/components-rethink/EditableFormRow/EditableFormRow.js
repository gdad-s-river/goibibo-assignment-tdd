import React from 'react';
import { Form } from 'antd';

import { EditableContext } from '../EditableTable/EditableTable';

const EditableRow = ({ form, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

export default EditableFormRow;
