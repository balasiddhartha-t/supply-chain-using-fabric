import React, { useEffect } from 'react';
import useGlobal from 'src/stores';
import Header from 'src/features/Header';
import StickyNavBar from 'src/features/StickyNavBar';
import DashboardBody from 'src/features/DashboardBody';
import Sidebar from 'src/features/Sidebar';
import './main.scss';

const Dashboard = () => {
  const [{ toggle }, { fetchData }] = useGlobal();
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Header />
      <Sidebar />
      <div className={toggle ? 'main' : 'main-extend'}>
        <StickyNavBar />
        <DashboardBody />
      </div>
    </>
  );
};

export default Dashboard;
