import React from 'react';
import AuthButton from '../../UI/AuthButton/AuthButton';
import './SideDrawer.scss';
import Navigation from '../../Navigation/Navigation';
import Backdrop from '../../UI/Backdrop/Backdrop';
import { MdClose } from 'react-icons/md';

const sideDrawer = (props) => {
    let attachedClasses = ["SideDrawer", "Close"];
    if (props.open) {
        attachedClasses = ["SideDrawer", "Open"];
    }

    return (
        <React.Fragment>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
                <div className="TopMenu">
                    <MdClose className="CloseSidrawer" />
                </div>
                <Navigation isAuth={props.isAuth} />
                <div className="Version">
                    <AuthButton clicked={props.login} isAuth={props.isAuth} />
                    Ver.1.0
                </div>
            </div>
        </React.Fragment>
    );
};

export default sideDrawer;