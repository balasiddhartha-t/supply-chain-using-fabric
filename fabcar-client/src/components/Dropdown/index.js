import React from 'react';
import PropTypes from 'prop-types';
import formatString from 'src/utilities/formatString';

const Dropdown = ({ options, className, onChange, placeholder, disabled, selected }) => {
  const items = [];
  if (placeholder) {
    items.push(
      <option key={placeholder} disabled>
        {placeholder}
      </option>
    );
  }
  const otherItems = options ? (
    options.map(item => (
      <option key={`${placeholder}-${item}`} value={item}>
        {formatString(item)}
      </option>
    ))
  ) : (
    <React.Fragment key={`Fragment-${placeholder}`} />
  );
  items.push(otherItems);
  return (
    <select
      disabled={disabled}
      selected={selected}
      defaultValue={placeholder}
      className={className}
      onChange={e =>
        // eslint-disable-next-line no-console
        onChange ? onChange.bind(this, e.target.value)() : console.log('change not handled')
      }
    >
      {items}
    </select>
  );
};

Dropdown.propTypes = {
  options: PropTypes.array,
  className: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  selected: PropTypes.bool
};

Dropdown.defaultProps = {
  options: [],
  className: '',
  onChange: null,
  placeholder: '',
  disabled: false,
  selected: false
};

export default Dropdown;
