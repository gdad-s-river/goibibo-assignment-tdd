import React from 'react';
import { Table, Input, Popconfirm, Form } from 'antd';
import PropTypes from 'prop-types';

import './Contacts.css';

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

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

class EditableTable extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    onSave: PropTypes.func.isRequired,
  };

  state = {
    editingKey: '',
  };
  columns = [
    {
      title: 'Contact Name',
      dataIndex: 'contactName',
      width: '30%',
      editable: true,
    },
    {
      title: 'Contact Number',
      dataIndex: 'contactNumber',
      width: '30%',
      editable: true,
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      render: (text, record) => {
        const editable = this.isEditing(record);
        return (
          <div>
            {editable ? (
              <span>
                <EditableContext.Consumer>
                  {form => (
                    // eslint-disable-next-line
                    <a
                      // eslint-disable-next-line
                      href="javascript:;"
                      onClick={() => this.save(form, record.key)}
                      style={{ marginRight: 8 }}
                    >
                      Save
                    </a>
                  )}
                </EditableContext.Consumer>
                <Popconfirm
                  title="Sure to cancel?"
                  onConfirm={() => this.cancel(record.key)}
                >
                  {
                    // eslint-disable-next-line
                    <a>Cancel</a>
                  }
                </Popconfirm>
              </span>
            ) : (
              // eslint-disable-next-line
              <a onClick={() => this.edit(record.key)}>Edit</a>
            )}
          </div>
        );
      },
    },
  ];

  isEditing = record => {
    return record.key === this.state.editingKey;
  };

  edit(key) {
    this.setState({ editingKey: key });
  }

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.props.data];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        // replacing with new data
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        // this.setState({ data: newData, editingKey: '' });
        this.props.onSave(newData);
        this.setState({ editingKey: '' });
      } else {
        newData.push(row);
        // this.setState({ data: newData, editingKey: '' });
      }
    });
  }

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  render() {
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,

          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });

    return (
      <Table
        components={components}
        bordered
        dataSource={this.props.data}
        columns={columns}
        rowClassName="editable-row"
        style={{ width: '60%', minWidth: '50%', margin: '0 auto' }}
      />
    );
  }
}

export default EditableTable;
