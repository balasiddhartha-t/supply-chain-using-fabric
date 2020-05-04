import React from 'react';
import PropTypes from 'prop-types';

const Section = ({ className, children }) => (
  <div className={`container ${className || ''}`}>{children}</div>
);

Section.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any
};

Section.defaultProps = {
  className: '',
  children: ''
};

export default Section;
