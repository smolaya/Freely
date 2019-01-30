import React from 'react'

const Search = (props) => {
    return (
      <div className="searchContent">
        <form className="searchForm">
          <input className="searchInput" type="text" name="test" value={props.inputValue} placeholder="city, state, zipcode..." onChange={props.handleSearchChange} />
          <div className="buttons">
              <button className="submitbutton">Submit</button>
          </div>
        </form>
      </div>
    )
};
export default Search;
