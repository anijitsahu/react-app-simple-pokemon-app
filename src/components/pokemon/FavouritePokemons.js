// dependencies
import React, { Component } from 'react'

// components
import Pokemon from './Pokemon'
import Navigation from './Navigation'

// Constants
import Constants from '../Constants'

class FavouritePokemons extends Component {

  constructor(props) {

    super(props)

    // initialize Constants
    this.allConstants = new Constants()

    console.log('Favourite panel reached', props)

    this.state = {
      pokemons: this.props.pokemons,
      startIndex: 0,
      total: 0,
      favourites: this.props.favourites
    }

    this.formatFavourites = this.formatFavourites.bind(this)
    this.changeRating = this.changeRating.bind(this)
  }

  formatFavourites(pokemons) {
    console.log('formatFavourites reached... ')
    let { favourites } = this.state

    pokemons = pokemons.filter((ele) => {
      return (favourites.indexOf(ele.id) > -1)
    })

    console.log("Fav pokemons are ", pokemons)
    return pokemons
  }

  changeRating(event) {
    console.log("changeRating reached")
    let favourites = [...this.state.favourites]
    let index = favourites.indexOf(parseInt(event.target.id))
    console.log("Index is now", index)
    favourites = favourites.splice(index, 1)
    console.log("Fav is now in FAV PANEL", favourites)

    this.props.changeRating(favourites)
  }

  render() {

    let { pokemons, startIndex, searchResults, total, showLoading, showNoResult, noResultText } = this.state
    let { favourites } = this.props
    pokemons = this.formatFavourites(pokemons)

    return (
      <div className="pokemon-panel">
      {
		  	pokemons.map((pokemon) => {
          return (
            <Pokemon key={pokemon.id} {...pokemon} favourites={favourites} changeRating={this.changeRating}/>
          )
        })      	
      }
	  	</div>
    )
  }

}

export default FavouritePokemons;