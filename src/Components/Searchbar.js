import React from "react";
import SearchIcon from '@material-ui/icons/Search';

const Searchbar = ({handleSearch, value}) => {
  return (
    <div className="searchbar">
        <SearchIcon />
        <input  
        type="search" 
        name="searchbar" 
        placeholder="SEARCH" 
        id=""
        value={value}
        onChange={handleSearch}
        />
    </div>
);
}

export default Searchbar;