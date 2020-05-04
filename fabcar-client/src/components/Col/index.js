import React from 'react';
import PropTypes from 'prop-types';

const Col = ({ className, children }) => {
  return <div className={`col ${className || ''}`}>{children}</div>;
};

Col.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any
};

Col.defaultProps = {
  className: '',
  children: ''
};

export default Col;
