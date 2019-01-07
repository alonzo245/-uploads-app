import React from 'react';
import './SearchInput.scss';

const SearchInput = (props) => (
  <div className="Search">
    <input type="search" onChange={props.filterList} placeholder="Search for a video title..." />
  </div>
);

export default SearchInput;