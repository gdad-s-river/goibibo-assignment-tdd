import React from 'react';
import { Input, Form } from 'antd';

import { EditableContext } from '../EditableTable/EditableTable';

const FormItem = Form.item;

class EditableCell extends React.Component {
  getInput = () => {
    return <Input />;
  };

  render() {
    const { editing, dataIndex, title, record, ...restProps } = this.props;

    return (
      <EditableContext.Consumer>
        {form => {
          const { getFieldDecorator } = form;
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem style={{ margin: 0 }}>
                  {getFieldDecorator(dataIndex, {
                    rules: [
                      {
                        required: true,
                        message: `Please Input ${title}!`,
                      },
                    ],
                    initialValue: record[dataIndex],
                  })(this.getInput())}
                </FormItem>
              ) : (
                restProps.children
              )}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}

export default EditableCell;
