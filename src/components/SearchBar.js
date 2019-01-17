import React from 'react';

const SearchBar = (props) => {
	let { searchText, handleChange, handleKeyPress } = props


	return (
		<div className="search-div">
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
