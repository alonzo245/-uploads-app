import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavigationItem.scss';

const NavigationItem = (props) => (
  <li>
    <NavLink activeClassName="Active" className="Link" to={props.href} exact={props.exact}>
      {props.name}
    </NavLink>
  </li>
);

export default NavigationItem;