import React, { useState, useEffect } from 'react';
import useGlobal from 'src/stores';
import Table from 'src/components/Table';
import Section from 'src/components/Section';
import Row from 'src/components/Row';
import Input from 'src/components/Input';
import sort from 'src/utilities/sortArray';
import FilterBar from '../FIlterBar';
import './main.scss';

const ShowTable = ({ data }) => {
  const [{ activeNav, activeLink }] = useGlobal();
  const [entries, setEntries] = useState(10);
  const [sortField, setsortField] = useState(-1);
  const [showFilters, setFilterVisible] = useState(true);
  const [filterFields, updateFilterState] = useState({});
  useEffect(() => {
    updateFilterState({});
  }, [activeNav, activeLink]);
  const updateEntries = value => {
    setEntries(value);
  };
  const updateFilters = obj => {
    updateFilterState({
      ...filterFields,
      ...obj
    });
  };

  let component = <></>;
  if (data.length) {
    const filteredData = data.filter(obj => {
      return (
        Object.keys(obj)
          .map(key =>
            obj[key].toLowerCase().indexOf(filterFields[key] ? filterFields[key].toLowerCase() : '')
          )
          .indexOf(-1) === -1
      );
    });
    const sortedData = sort(filteredData, sortField).slice(0, entries);
    component = (
      <>
        <Row>
          <Section className={`${showFilters ? 'filters' : 'hidden'} center float-left`}>
            <FilterBar fields={Object.keys(data[0])} updateFilters={updateFilters} />
          </Section>
          <Section className="table-container">
            <Section className="entries center">
              {'Show '}
              <Input type="number" min="1" max="100" value={entries} onChange={updateEntries} />
              {` entries of ${filteredData.length} results`}
            </Section>
            <Table className="customTable" data={sortedData} />
          </Section>
        </Row>
      </>
    );
  }
  return component;
};

export default ShowTable;
