import React from 'react';

import Logo from '../../assets/images/youflix.png';
import './Logo.scss';

const logo = (props) => (
    <div className="Logo" style={{height: props.height}}>
        <img src={Logo} alt="YOUFLIX" />
    </div>
);

export default logo;