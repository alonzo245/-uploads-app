import React from 'react';
import './Toggle.scss';

const Toggle = (props) => {

  return (
    <div className="ToggleCheckbox" onChange={props.toggleTheme}>
      <div className="can-toggle demo-rebrand-2">
        <input id="e" type="checkbox" />
        <label htmlFor="e">
          <div className="can-toggle__label-text">Mode</div>
          <div className="can-toggle__switch" data-checked="Off" data-unchecked="On"></div>
        </label>
      </div>
    </div>
  )
};

export default Toggle;