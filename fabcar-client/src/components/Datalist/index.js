/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Input from '../Input';

const Datalist = ({ disabled, options, listId, className, placeholder, matched }) => {
  const [value, changeValue] = useState('');
  const change = targetValue => {
    changeValue(targetValue);
    if (options.includes(targetValue)) {
      matched(targetValue);
    }
  };
  return (
    <>
      <Input
        disabled={disabled}
        className={className}
        list={listId}
        value={value}
        onChange={change}
        placeholder={placeholder}
        type="search"
      />
      <datalist id={listId} placeholder={placeholder}>
        {!options.length
          ? 'No data'
          : options.map((item, i) => <option key={`${listId}-${item}-${i}`} value={item} />)}
      </datalist>
    </>
  );
};

Datalist.propTypes = {
  disabled: PropTypes.bool,
  options: PropTypes.array,
  listId: PropTypes.string,
  className: PropTypes.string,
  matched: PropTypes.func,
  placeholder: PropTypes.string
};

Datalist.defaultProps = {
  disabled: false,
  options: [],
  listId: '',
  className: '',
  matched: null,
  placeholder: ''
};

export default Datalist;
