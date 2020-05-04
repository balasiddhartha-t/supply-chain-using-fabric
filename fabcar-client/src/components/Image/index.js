import React from 'react';
import PropTypes from 'prop-types';

const Image = ({ src, alt, className }) => {
  return (
    <div className="">
      <img className={className} src={src} alt={alt} />
    </div>
  );
};

Image.propTypes = {
  src: PropTypes.any,
  alt: PropTypes.string,
  className: PropTypes.string
};

Image.defaultProps = {
  src: '#',
  alt: 'image',
  className: ''
};
export default Image;
