import React from 'react';


const Pokemon = (props) => {
	let { name, id, height, weight, types, stats } = props
	return (
		<div className="pokemon-div" name={`${id}-${name}`}>
			<div className="pokemon-name">{name}</div>
			<div className="pokemon-info">Height {(height) ? height : 'NA'}</div>
			<div className="pokemon-info">Weight {(weight) ? weight : 'NA'}</div>

		</div>
	);
}

export default Pokemon;