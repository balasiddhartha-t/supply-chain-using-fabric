import React from 'react';
import {
  IoIosCar,
  IoIosList,
  IoIosPerson,
  IoIosPersonAdd,
  IoIosMenu,
  IoIosArrowRoundBack
} from 'react-icons/io';
import CustomLink from 'src/components/Link';
import useGlobal from 'src/stores';
import './main.scss';

const getSideLinks = owner => {
  const links = {
    orders: { icon: <IoIosList />, text: 'Orders' },
    vehicles: { icon: <IoIosCar />, text: 'Vehicles' },
    customers: { icon: <IoIosPerson />, text: 'Customers' },
    suppliers: { icon: <IoIosPersonAdd />, text: 'Suppliers' }
  };
  switch (owner) {
    case 'jeep':
      return { ...links };
    case 'jeepdealer':
      return { ...links };
    case 'jeeplogistics':
      return { orders: links.orders, customers: links.customers };
    case 'jeeptrucking':
      return { orders: links.orders, customers: links.customers };
    case 'cbp.gov':
      return { ...links };
    default:
      return {};
  }
};

const Sidebar = () => {
  const [
    { toggle, activeLink, user },
    { toggleChange, activeLinkChange, activeNavChange }
  ] = useGlobal();
  const { owner } = user;
  const sideClass = toggle ? 'sidenav' : 'sidenav-collapse';
  const sideLinks = getSideLinks(owner);
  const changeSideLink = e => {
    const targetElement = e.currentTarget.firstChild;
    Object.keys(sideLinks).forEach(link => {
      if (
        targetElement &&
        sideLinks[link].text === targetElement.innerHTML &&
        activeLink !== link
      ) {
        activeNavChange('1');
        activeLinkChange(link);
      }
    });
  };

  const Links = Object.keys(sideLinks).map(link => {
    return (
      <CustomLink
        className={`sidelink ${toggle ? 'text-left' : 'center'}`}
        onClick={changeSideLink}
        key={`${sideLinks[link].text}`}
      >
        <span className="hidden">{sideLinks[link].text}</span>
        <h2>
          {sideLinks[link].icon}
          {toggle ? <span className="linkText">{sideLinks[link].text}</span> : <></>}
        </h2>
      </CustomLink>
    );
  });
  return (
    <>
      <div className={sideClass}>
        <div className="">
          <CustomLink className="sidelink" onClick={toggleChange}>
            <h2 className={`${toggle ? 'float-right' : ''}`}>
              {toggle ? <IoIosArrowRoundBack /> : <IoIosMenu />}
            </h2>
          </CustomLink>
        </div>
        {Links}
      </div>
    </>
  );
};

export default Sidebar;
