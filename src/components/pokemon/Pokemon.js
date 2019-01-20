import React from 'react';


const Pokemon = (props) => {

  let { name, id, height, weight, types, stats, favourites, changeRating } = props
  let starStyle = (favourites.indexOf(id) >-1) ? "fas fa-star active star-icon" : "fas fa-star star-icon"
  
  return (
    <div className="pokemon-div" name={`${id}-${name}`}>
    	<i className={starStyle} id={id} onClick={changeRating}></i>
			<div className="pokemon-name">{name}</div>

			{
				["height", "weight"].map((ele)=>{
					return (
						<div key={`${id}-${ele}`} className="pokemon-info">
							<div className="info-type">{ele}</div>
							<div className="info-desc"> {(props[ele]) ? props[ele] : 'NA'}</div>
						</div>							
					)
				})
			}
			<div className="popover">
				<i className="fa fa-info-circle info-icon"></i>
				<div className="popover-content">
					<div key={`${id}-types`} className="pokemon-info">
						<div className="info-type">types</div>
						<div className="info-desc">{types}</div>
					</div>	
					<div className="stats-div">{name} stats</div>
					{	
						stats.map((ele)=> {
							return(
								<div key={`${id}-${ele.name}`} className="pokemon-info">
									<div className="info-type">{ele.name}</div>
									<div className="info-desc">{ele.rank}</div>
								</div>		
							)
						})
					}
				</div>
			</div>
		</div>
  );
}

export default Pokemon;