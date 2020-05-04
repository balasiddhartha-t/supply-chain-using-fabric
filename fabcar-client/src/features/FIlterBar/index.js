import React, { useState, useEffect } from 'react';
import { IconContext } from 'react-icons';
import { IoIosClose } from 'react-icons/io';
import PropTypes from 'prop-types';
import Section from 'src/components/Section';
import Row from 'src/components/Row';
import Dropdown from 'src/components/Dropdown';
import Input from 'src/components/Input';
import Button from 'src/components/Button';
import './main.scss';

const FilterBar = ({ fields, updateFilters }) => {
  const [selectedFields, updateSelected] = useState({});
  const [add, updateAdd] = useState(false);
  const filterSelected = Object.keys(selectedFields).filter(field => fields.indexOf(field) >= 0);
  useEffect(() => {
    if (!filterSelected.length && add) updateAdd(false);
  });
  const displayFields = filterSelected.map(key => {
    return (
      <React.Fragment key={key}>
        <Section>
          <Row className="select-close">
            <Dropdown className="filterSelect" disabled placeholder={key} />
            <Button
              className="close-icon"
              onClick={() => {
                const rest = selectedFields;
                delete rest[key];
                delete filterSelected[key];
                updateSelected({ ...rest });
                updateFilters({ [key]: '' });
              }}
            >
              <IconContext.Provider value={{ color: '#222222', size: '20px' }}>
                <IoIosClose />
              </IconContext.Provider>
            </Button>
          </Row>
        </Section>
        <Input
          className="filterInput"
          value={selectedFields[key]}
          onChange={value => {
            updateSelected({ ...selectedFields, [key]: value });
            updateFilters({ [key]: value });
          }}
        />
      </React.Fragment>
    );
  });
  const showAdd =
    fields.length > displayFields.length ? (
      add ? (
        <Button className="filterAdd" onClick={() => updateAdd(!add)}>
          Add
        </Button>
      ) : (
        <Dropdown
          className="filterSelect"
          placeholder="Select Field Name"
          disabled={false}
          value=""
          listd=""
          options={fields.filter(field => Object.keys(selectedFields).indexOf(field) === -1)}
          onChange={value => {
            updateSelected({ ...selectedFields, [value]: '' });
            updateAdd(!add);
          }}
        />
      )
    ) : (
      <></>
    );
  return (
    <>
      {displayFields}
      <Section>
        {showAdd}
      </Section>
    </>
  );
};

FilterBar.propTypes = {
  fields: PropTypes.array,
  updateFilters: PropTypes.func
};

FilterBar.defaultProps = {
  fields: [],
  updateFilters: () => {}
};

export default FilterBar;
