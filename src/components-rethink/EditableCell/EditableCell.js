import React from 'react';
import { Input, Form } from 'antd';

// import { ContactNameInput, ContactNumberInput } from '../index';

import { EditableContext } from '../EditableTable/EditableTable';

/**
 * ORIGINAL CODE STARTS
 */

const FormItem = Form.Item;
class EditableCell extends React.Component {
  getInput = () => {
    // return <Input />;
    // const { dataIndex } = this.props;

    // if (dataIndex === 'contactName') {
    //   return <ContactNameInput />;
    // }

    // if (dataIndex === 'contactNumber') {
    //   return <ContactNumberInput />;
    // }

    return <Input />;
  };

  render() {
    const { editing, dataIndex, title, record, ...restProps } = this.props;

    // console.log(dataIndex);
    // console.log(this.props);

    return (
      <EditableContext.Consumer>
        {form => {
          const { getFieldDecorator } = form;

          let el = 'Loading';

          if (dataIndex) {
            el = (
              <FormItem style={{ margin: 0 }}>
                {getFieldDecorator(dataIndex, {
                  rules: [
                    {
                      required: true,
                      message: `Please Input ${title}!`,
                    },
                  ],
                  initialValue: record && record[dataIndex],
                })(this.getInput())}
              </FormItem>
            );
          }

          // const el = <div>Yeah science</div>;

          // eslint-disable-next-line
          // console.log(el);

          return <td {...restProps}>{editing ? el : restProps.children}</td>;
        }}
      </EditableContext.Consumer>
    );
  }
}

//* ORIGINAL CODE ENDS

// const FormItem = Form.Item;

// class EditableCell extends React.Component {
//   getInput = () => {
//     return <Input />;
//   };

//   render() {
//     const { editing, dataIndex, title, record, ...restProps } = this.props;
//     return (
//       <EditableContext.Consumer>
//         {form => {
//           const { getFieldDecorator } = form;
// return (
//   <td {...restProps}>
//     {editing ? (
//       <FormItem style={{ margin: 0 }}>
//         {getFieldDecorator(dataIndex, {
//           rules: [
//             {
//               required: true,
//               message: `Please Input ${title}!`,
//             },
//           ],
//           initialValue: record[dataIndex],
//         })(this.getInput())}
//       </FormItem>
//     ) : (
//       restProps.children
//     )}
//   </td>
// );
//         }}
//       </EditableContext.Consumer>
//     );
//   }
// }

export default EditableCell;
