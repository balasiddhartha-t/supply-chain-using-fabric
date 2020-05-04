import React from 'react';
import Section from 'src/components/Section';
import Row from 'src/components/Row';
import CustomLink from 'src/components/Link';
import useGlobal from 'src/stores';
import getSections from './section';
import './main.scss';

const StickyNavBar = () => {
  const [{ user, activeNav, activeLink }, { activeNavChange }] = useGlobal();
  const { owner } = user;
  const navLinks = getSections(activeLink, owner);
  const changeNav = e => {
    Object.keys(navLinks).forEach(link => {
      if (navLinks[link] === e.target.innerHTML && activeNav !== link) {
        activeNavChange(link);
      }
    });
  };

  const navBar = Object.keys(navLinks).map(link => (
    <CustomLink
      key={`nav-${link}`}
      className={`navLink ${activeNav === link ? 'active' : ''}`}
      onClick={changeNav}
    >
      {navLinks[link]}
    </CustomLink>
  ));

  return (
    <Section className="stickyNav">
      <Row className="flex">{navBar}</Row>
    </Section>
  );
};

export default StickyNavBar;
