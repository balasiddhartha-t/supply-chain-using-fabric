import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CustomLink = ({ className, children, onClick, type, to }) => {
  return type === 'button' ? (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  ) : (
    <Link to={to}>{children}</Link>
  );
};

CustomLink.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.any,
  type: PropTypes.string,
  to: PropTypes.string
};

CustomLink.defaultProps = {
  onClick: null,
  className: '',
  children: '',
  type: 'button',
  to: ''
};

export default CustomLink;
