import React from 'react';
import PropTypes from 'prop-types';
import { epochToTime } from 'src/utilities/timeConversions';
import './main.scss';

const History = ({ data }) => {
  const timeLine = data.length ? (
    data.map((item, index) => {
      return (
        <div className={`containerBox ${index % 2 === 0 ? 'leftBox' : 'rightBox'}`}>
          <div className="content">
            <p className="date">{epochToTime(item.timestamp)}</p>
            {item.content}
          </div>
        </div>
      );
    })
  ) : (
    <></>
  );
  return <div className="timeline">{timeLine}</div>;
};

History.propTypes = {
  data: PropTypes.array
};

History.defaultProps = {
  data: []
};

export default History;
