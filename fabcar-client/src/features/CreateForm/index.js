import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useGlobal from 'src/stores';
import Section from 'src/components/Section';
import Form from 'src/components/Form';
import Message from 'src/components/Message';
import staticFields from 'src/constants/fields';
import './main.scss';

const { allFields } = staticFields;

const CreateForm = ({ item }) => {
  const [, { createOrder }] = useGlobal();
  const [fieldValues, updateFields] = useState({});
  let fields = [];

  switch (item) {
    case 'newOrder':
      fields = allFields;
      break;
    default:
      fields = [];
  }

  fields.forEach(field => {
    field.value = fieldValues[field.label];
    field.onChange = newValue => {
      updateFields({ ...fieldValues, [field.label]: newValue });
    };
  });

  const submitForm = () => {
    createOrder(fieldValues);
  };

  const submit = {
    name: 'Submit',
    field: 'button',
    type: 'button',
    className: 'form-submit',
    onClick: submitForm
  };

  const form = (
    <Section className="create-form">
      <Form className="" data={[...fields, submit]} type="vertical" />
      <Message />
    </Section>
  );

  return <Section className="center">{form}</Section>;
};

CreateForm.propTypes = {
  item: PropTypes.string
};

CreateForm.defaultProps = {
  item: 'vehicle'
};

export default CreateForm;
