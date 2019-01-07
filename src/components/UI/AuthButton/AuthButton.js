import React from 'react';
import { Link } from 'react-router-dom';

import './AuthButton.scss';

const AuthButton = (props) => {
    let element = (<button onClick={props.clicked} className="AuthButton">Login</button>);
    
    if (props.isAuth) {
        element = <Link to="/logout" className="AuthButton">Logout</Link>;
    }
    return element
}

export default AuthButton;