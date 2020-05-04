import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useGlobal from 'src/stores';
import Section from 'src/components/Section';
import Datalist from 'src/components/Datalist';
import Form from 'src/components/Form';
import Message from 'src/components/Message';
import formatString from 'src/utilities/formatString';
import staticFields from 'src/constants/fields';
import './main.scss';

const { vehicleFields, orderFields, customerFields, supplierFields } = staticFields;

const ShowForm = ({ item }) => {
  const [{ vehicles, customers, suppliers, orders }, { submitForms }] = useGlobal();
  const [value, changeValue] = useState('');
  const [fieldValues, updateFields] = useState({});
  let fields = [];
  let data = [];
  let key = '';
  switch (item) {
    case 'vehicle':
      fields = vehicleFields;
      data = vehicles;
      key = 'ProductID';
      break;
    case 'order':
      fields = orderFields;
      data = orders;
      key = 'OrderID';
      break;
    case 'customer':
      fields = customerFields;
      data = customers;
      key = 'CustomerID';
      break;
    case 'supplier':
      fields = supplierFields;
      data = suppliers;
      key = 'SupplierName';
      break;
    default:
      fields = [];
  }
  const options = data.map(obj => obj[key]);
  let form = <></>;
  if (value) {
    fields.forEach(field => {
      field.value = fieldValues[field.label];
      field.onChange = newValue => {
        updateFields({ ...fieldValues, [field.label]: newValue });
      };
    });
    const submitForm = () => {
      submitForms(item, fieldValues);
    };
    const submit = {
      name: 'Submit',
      field: 'button',
      type: 'button',
      className: 'form-submit',
      onClick: submitForm
    };
    form = (
      <Section className="update-form">
        <Form className="" data={[...fields, submit]} type="vertical" />
        <Message />
      </Section>
    );
  }
  const matched = newValue => {
    const element = data.filter(obj => obj[key] === newValue)[0];
    const obj = {};
    fields.forEach(field => {
      obj[field.label] = element[field.label];
    });
    changeValue(newValue);
    updateFields(obj);
  };
  return (
    <Section className="center">
      {`Enter the ${formatString(key)} of the ${item} `}
      <Datalist listId="keyField" options={options} matched={matched} />
      {form}
    </Section>
  );
};

ShowForm.propTypes = {
  item: PropTypes.string
};

ShowForm.defaultProps = {
  item: 'vehicle'
};
export default ShowForm;
