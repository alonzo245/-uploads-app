import React from 'react';
import './Spinner.scss';

const spinner = (props) => (
  <div className={props.loaderPagination ? "LoaderPagination" : "loaderWrapper"}>
    <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
  </div>
);

export default spinner;