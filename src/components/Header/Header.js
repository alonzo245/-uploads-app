import React from 'react';
import './Header.scss';
import AuthButton from '../UI/AuthButton/AuthButton';
import DrawerToggle from '../Navigation/SideDrawer/DrawerToggle/DrawerToggle';
const Header = (props) => {

  return (
    <header className="Header">
      <DrawerToggle clicked={props.drawerToggleClicked} />

      <div className="NavWrapper">
    
        <div className="RightItems">
          <AuthButton clicked={props.login} isAuth={props.isAuth} />
        </div>
      </div>
    </header>
  )
};

export default Header;