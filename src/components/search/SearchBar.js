import React from 'react';

const SearchBar = (props) => {
	let { searchText, handleChange, handleKeyPress } = props


	return (
		<div className="search-div">
			<i className="fas fa-search search-icon" id="searchbutton" onClick={handleKeyPress}></i>
			<input
				type="text"
				placeholder="Search by pokemon name or type"
				value={searchText}
				onKeyPress={handleKeyPress}
				onChange={handleChange} />
		</div>
	)
}


export default SearchBar;
