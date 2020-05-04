import React from 'react';
import { IoMdLogOut } from 'react-icons/io';
import useGlobal from 'src/stores';
import Section from 'src/components/Section';
import Row from 'src/components/Row';
import Image from 'src/components/Image';
import Button from 'src/components/Button';
import logo from '../../images/logo.png';

import './main.scss';

const Dashboard = () => {
  const [{ user }, { logout }] = useGlobal();
  const { username } = user;
  return (
    <Section className="header">
      <Row className="">
        <span className="float-left">
          <Image className="logo" src={logo} alt="Cadena logo" />
        </span>
        <span className="user float-right">
          {`Hello, ${username}`}
          <Button className="logout" onClick={logout}>
            <IoMdLogOut />
          </Button>
        </span>
      </Row>
    </Section>
  );
};

export default Dashboard;
