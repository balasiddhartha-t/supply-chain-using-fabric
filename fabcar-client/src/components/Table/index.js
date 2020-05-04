import React from 'react';
import PropTypes from 'prop-types';
import formatString from 'src/utilities/formatString';

const Table = ({ className, data }) => {
  const headings = data.length ? (
    <tr>
      {Object.keys(data[0]).map(head => (
        <th key={`head-${head}`}>{formatString(head)}</th>
      ))}
    </tr>
  ) : (
    []
  );
  const tRow = obj => (
    <tr key={`row-${JSON.stringify(obj)}`}>
      {Object.keys(obj).map(key => (
        <td key={`key-${key}`}>{obj[key]}</td>
      ))}
    </tr>
  );
  const values = data.length ? data.map(obj => tRow(obj)) : [];
  return (
    <table className={`${className || ''}`}>
      <thead>{headings}</thead>
      <tbody>{values}</tbody>
    </table>
  );
};

Table.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array
};

Table.defaultProps = {
  className: '',
  data: []
};

export default Table;
