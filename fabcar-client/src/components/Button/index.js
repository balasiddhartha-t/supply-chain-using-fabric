import React from 'react';
import PropTypes from 'prop-types';
import './main.scss';

const Button = ({ name, onClick, children, className }) => {
  return (
    <button type="button" name={name} className={className} onClick={e => onClick.bind()(e)}>
      {children}
    </button>
  );
};

Button.propTypes = {
  name: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.any
};

Button.defaultProps = {
  name: '',
  onClick: null,
  className: '',
  children: ''
};

export default Button;
