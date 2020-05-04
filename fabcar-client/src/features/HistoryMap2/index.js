import React, { useState } from 'react';
import useGlobal from 'src/stores';
import Section from 'src/components/Section';
import Datalist from 'src/components/Datalist';
import History from 'src/components/History';
import formatString from 'src/utilities/formatString';
// import orderHistory from './static';

const compare = (newD, old) => {
  const newData = JSON.parse(newD);
  const oldData = JSON.parse(old);
  const modified = Object.keys(newData).filter(key => oldData[key] !== newData[key]);
  const messages = [];
  modified.forEach(key => {
    messages.push(
      <p>
        {`${formatString(key)}:`}
        <span className="tab"></span>
        {`${oldData[key]} --> ${newData[key]}`}
      </p>
    );
  });
  if (!messages.length) messages.push('Nothing modified');
  return messages;
};

const massageData = data => {
  const getMessage = (now, prev) => {
    if (now) return compare(data[now].data, data[prev].data);
    return 'Initial transaction: Order created';
  };
  return data.map((item, i) => {
    return {
      timestamp: `${item.timestamp.seconds}000`,
      content: getMessage(i, i - 1)
    };
  });
};

const HistoryMap = () => {
  const [{ carNumbers }, { getCarHistory }] = useGlobal();
  const [value, changeValue] = useState('');
  const [orderHistory, setOrderHistory] = useState([]);
  let history = <></>;
  if (value) {
    const orderData = massageData(orderHistory);
    history = <History data={orderData} />;
  }
  const matched = newValue => {
    getCarHistory(value, setOrderHistory);
    changeValue(newValue);
  };
  return (
    <Section className="center">
      {'Enter the Car Number of the vehicle '}
      <Datalist listId="keyField" options={carNumbers} matched={matched} />
      {history}
    </Section>
  );
};

export default HistoryMap;
