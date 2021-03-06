// import React from 'react';
// import 'antd/dist/antd.css';

// import { Table, Popconfirm } from 'antd';

// import { EditableFormRow, EditableCell } from '../';

/**ORIGINAL CODE BEGINS */

import React, { Fragment } from 'react';
import { Table, Popconfirm } from 'antd';
import PropTypes from 'prop-types';

import { EditableFormRow, EditableCell } from '../index';

const EditableContext = React.createContext();

export { EditableContext };

const OperationLinkStyles = {
  padding: '10px',
};

/**ORIGINAL CODE ENDS */

/**ORIGINAL CODE BEGINS */

class EditableTable extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    onSave: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
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
                  {/* eslint-disable-next-line */}
                  <a>Cancel</a>
                </Popconfirm>
              </span>
            ) : (
              <Fragment>
                {/* eslint-disable-next-line */}
                <a
                  href="javascript:;"
                  style={OperationLinkStyles}
                  onClick={() => this.edit(record.key)}
                >
                  Edit
                </a>
                <Popconfirm
                  title="Sure to delete?"
                  onConfirm={() => this.delete(record.key)}
                >
                  {/* eslint-disable-next-line */}
                  <a style={OperationLinkStyles} href="javascript:;">
                    Delete
                  </a>
                </Popconfirm>
              </Fragment>
            )}
          </div>
        );
      },
    },
  ];

  delete = toDeleteKey => {
    const afterDeleteData = this.props.data.filter(
      contact => contact.key !== toDeleteKey,
    );

    this.props.onDelete(afterDeleteData);
  };

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
        style={{ width: '60%', minWidth: '50%', margin: '3rem auto' }}
      />
    );
  }
}

/**ORIGINAL CODE ENDS */

// const EditableContext = React.createContext();
// export { EditableContext };

// const data = [];
// for (let i = 0; i < 100; i++) {
//   data.push({
//     key: i.toString(),
//     name: `Edrward ${i}`,
//     age: 32,
//     address: `London Park no. ${i}`,
//   });
// }

// class EditableTable extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { data, editingKey: '' };
//     this.columns = [
//       {
//         title: 'name',
//         dataIndex: 'name',
//         width: '25%',
//         editable: true,
//       },
//       {
//         title: 'age',
//         dataIndex: 'age',
//         width: '15%',
//         editable: true,
//       },
//       {
//         title: 'address',
//         dataIndex: 'address',
//         width: '40%',
//         editable: true,
//       },
//       {
//         title: 'operation',
//         dataIndex: 'operation',
//         render: (text, record) => {
//           const editable = this.isEditing(record);
//           return (
//             <div>
//               {editable ? (
//                 <span>
//                   <EditableContext.Consumer>
//                     {form => (
//                       <a
//                         href="javascript:;"
//                         onClick={() => this.save(form, record.key)}
//                         style={{ marginRight: 8 }}
//                       >
//                         Save
//                       </a>
//                     )}
//                   </EditableContext.Consumer>
//                   <Popconfirm
//                     title="Sure to cancel?"
//                     onConfirm={() => this.cancel(record.key)}
//                   >
//                     <a>Cancel</a>
//                   </Popconfirm>
//                 </span>
//               ) : (
//                 <a onClick={() => this.edit(record.key)}>Edit</a>
//               )}
//             </div>
//           );
//         },
//       },
//     ];
//   }

//   isEditing = record => {
//     return record.key === this.state.editingKey;
//   };

//   edit(key) {
//     this.setState({ editingKey: key });
//   }

//   save(form, key) {
//     form.validateFields((error, row) => {
//       if (error) {
//         return;
//       }
//       const newData = [...this.state.data];
//       const index = newData.findIndex(item => key === item.key);
//       if (index > -1) {
//         const item = newData[index];
//         newData.splice(index, 1, {
//           ...item,
//           ...row,
//         });
//         this.setState({ data: newData, editingKey: '' });
//       } else {
//         newData.push(row);
//         this.setState({ data: newData, editingKey: '' });
//       }
//     });
//   }

//   cancel = () => {
//     this.setState({ editingKey: '' });
//   };

//   render() {
//     const components = {
//       body: {
//         row: EditableFormRow,
//         cell: EditableCell,
//       },
//     };

//     const columns = this.columns.map(col => {
//       if (!col.editable) {
//         return col;
//       }
//       return {
//         ...col,
//         onCell: record => ({
//           record,
//           inputType: col.dataIndex === 'age' ? 'number' : 'text',
//           dataIndex: col.dataIndex,
//           title: col.title,
//           editing: this.isEditing(record),
//         }),
//       };
//     });

//     return (
//       <Table
//         components={components}
//         bordered
//         dataSource={this.state.data}
//         columns={columns}
//         rowClassName="editable-row"
//       />
//     );
//   }
// }

export default EditableTable;
