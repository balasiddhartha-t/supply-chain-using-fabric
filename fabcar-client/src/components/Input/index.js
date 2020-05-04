import React from 'react';
import PropTypes from 'prop-types';
import './main.scss';

const Input = ({
  className,
  value,
  type,
  list,
  onChange,
  max,
  min,
  placeholder,
  name,
  disabled
}) => {
  return (
    <label htmlFor={name}>
      <input
        id={name ? name : null}
        key={name}
        className={className}
        type={type}
        disabled={disabled}
        list={list}
        value={value}
        max={max}
        min={min}
        placeholder={placeholder}
        onChange={e =>
          // eslint-disable-next-line no-console
          onChange ? onChange.bind(this, e.target.value)() : console.log('change not handled')
        }
      />
      {name}
    </label>
  );
};

Input.propTypes = {
  className: PropTypes.string,
  value: PropTypes.any,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  list: PropTypes.string,
  onChange: PropTypes.func,
  max: PropTypes.string,
  min: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string
};

Input.defaultProps = {
  className: '',
  value: '',
  type: '',
  disabled: false,
  list: '',
  onChange: null,
  max: '100',
  min: '0',
  placeholder: '',
  name: ''
};

export default Input;
