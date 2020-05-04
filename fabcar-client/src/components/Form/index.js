import React from 'react';
import PropTypes from 'prop-types';
import formatString from 'src/utilities/formatString';
import Input from '../Input';
import Button from '../Button';
import Dropdown from '../Dropdown';
import './main.scss';

const getFormfield = element => {
  const {
    name,
    placeholder,
    type,
    field,
    className,
    value,
    label,
    onClick,
    onChange,
    editable,
    options
  } = element;
  let jsx = <></>;
  switch (field) {
    case 'input':
      jsx = (
        <>
          {label ? <span className="form-label">{formatString(label)}</span> : <></>}
          <Input
            name={name}
            disabled={editable === false ? true : false}
            placeholder={placeholder}
            type={type}
            value={value}
            onChange={onChange}
            className={className}
          />
        </>
      );
      break;
    case 'button':
      jsx = (
        <Button name={name} className={className} onClick={onClick}>
          {name}
        </Button>
      );
      break;
    case 'select':
      jsx = (
        <Dropdown
          placeholder={placeholder}
          className={className}
          options={options}
          onChange={onChange}
        >
          {name}
        </Dropdown>
      );
      break;
    default:
      jsx = <></>;
  }
  return jsx;
};

const Form = ({ className, data, type }) => {
  let fields = data && data.length ? data.map(obj => getFormfield(obj)) : [];
  if (type === 'vertical') {
    fields = fields.map((field, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <React.Fragment key={`field=${i}`}>
        {field}
        <br />
      </React.Fragment>
    ));
  }
  return <form className={`${className || ''}`}>{fields}</form>;
};

Form.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array,
  type: PropTypes.string
};

Form.defaultProps = {
  className: '',
  data: [],
  type: ''
};

export default Form;
