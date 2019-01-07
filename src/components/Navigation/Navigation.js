import React from 'react';
import './Navigation.scss';
import NavigationItem from './NavigationItem/NavigationItem';


const links = [
  { href: "/", name: "Main", exact: true },
];


const authLinks = [
  ...links,
  { href: "/social", name: "Social", exact: true, isAuth: true }
];

const Navigation = (props) => {
  const updatedLinks = props.isAuth ? authLinks : links;
  return (
    <nav>
      <ul>
        {updatedLinks.map((link, index) => (
          <NavigationItem key={index} href={link.href} name={link.name} exact={link.exact} />
        ))}
      </ul>
    </nav>
  )

};

export default Navigation;