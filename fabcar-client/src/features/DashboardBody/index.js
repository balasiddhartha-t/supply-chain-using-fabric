import React from 'react';
import useGlobal from 'src/stores';
import Section from 'src/components/Section';
// import Form from 'src/components/Form';
import ShowTable from 'src/features/TableWithFilter';
import ShowForm from 'src/features/UpdateForms';
import HistoryMap from 'src/features/HistoryMap2';
import CreateForm from 'src/features/CreateForm';

const DashboardBody = () => {
  const [{ activeNav, activeLink, vehicles, customers, suppliers, orders }] = useGlobal();
  const getSection = (link, nav) => {
    switch (link) {
      case 'vehicles':
        switch (nav) {
          case '1':
            return <ShowTable data={vehicles} />;
          case '2':
            return vehicles.length ? <ShowForm item="vehicle" /> : <></>;
          default:
            return <div>Cannot fetch data</div>;
        }
      case 'customers':
        switch (nav) {
          case '1':
            return <ShowTable data={customers} />;
          case '2':
            return <ShowForm item="customer" />;
          default:
            return <div>Cannot fetch data</div>;
        }
      case 'suppliers':
        switch (nav) {
          case '1':
            return <ShowTable data={suppliers} />;
          case '2':
            return <ShowForm item="supplier" />;
          default:
            return <div>Cannot fetch data</div>;
        }
      case 'orders':
        switch (nav) {
          case '1':
            return <ShowTable data={orders} />;
          case '2':
            return <ShowForm item="order" />;
          case '3':
            return <CreateForm item="newOrder" />;
          case '4':
            return <HistoryMap />;
          default:
            return <div>In Progres</div>;
        }
      default:
        return <div>Cannot fetch data</div>;
    }
  };
  const section = getSection(activeLink, activeNav);
  return <Section className="dashboardBody">{section}</Section>;
};

export default DashboardBody;
