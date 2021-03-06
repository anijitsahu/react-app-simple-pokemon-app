// dependencies
import React from 'react';

const Navigation = (props) => {

	let { updatePokemons, position, srcNumber, total } = props
	let classStyle = (position == "left") ? "fas fa-less-than arrow" : "fas fa-greater-than arrow arrow-right"

	return (
		<i id={position} className={classStyle} onClick={updatePokemons}></i>
	);
}


export default Navigation;