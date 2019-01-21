// dependencies
import React, { Component } from 'react'

// components
import Pokemon from './Pokemon'
import Navigation from './Navigation'
import NoResult from './NoResult'


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
      pokemonsOrig: this.props.pokemons,
      startIndex: 0,
      total: 0,
      favourites: this.props.favourites,
      noResultText: "Not Match Found",
      showNoResult: false,
      searchResults: false,

    }

    this.formatFavourites = this.formatFavourites.bind(this)
    this.changeRating = this.changeRating.bind(this)
    this.updatePokemons = this.updatePokemons.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.favId !== this.props.favId) {
      console.log("changed favourites")
      this.setState({ favourites: nextProps.favourites })
    }

    if (nextProps.searchId && (nextProps.searchId !== this.props.searchId)) {
      this.searchAndFilterPokemons(nextProps.searchText)
    }
  }

  // search / filter on the fav list
  searchAndFilterPokemons(searchText) {
    // console.log('Code reached', searchText)
    let pokemons = [...this.state.pokemonsOrig]

    pokemons = pokemons.filter((ele) => {
      return ele.name.includes(searchText) || ele.types.includes(searchText)
    })

    this.setState({ pokemons }, () => {
      // console.log("pokemons after the search", pokemons)
      if (pokemons.length == 0) {
        this.setState({ showNoResult: true }, () => {
          console.log("State is now ,", this.state)
        })
      }
    })

    if (searchText == "") {
      this.setState({ searchResults: false, showNoResult: false })
    } else {
      this.setState({ searchResults: true, showNoResult: false })
    }
  }

  // updates the pokemons when the next /prev button is clicked
  updatePokemons(event) {
    let { id: type } = event.target

    let { startIndex, total, searchResults } = this.state
    console.log("Start and total are : ", startIndex, ' and ', total)

    if (type == "right") {
      this.setState({
        startIndex: startIndex + this.allConstants.PERMISSIBLE_PAGINATION_LIMIT + 1,
      }, () => {
        console.log('State is updated', this.state)
      })
    } else {
      this.setState({
        startIndex: ((startIndex - this.allConstants.PERMISSIBLE_PAGINATION_LIMIT) < 0) ? 0 : startIndex - this.allConstants.PERMISSIBLE_PAGINATION_LIMIT - 1,
      }, () => {
        console.log('State is updated', this.state)
      })
    }
  }

  componentDidMount() {
    let pokemons = this.formatFavourites(this.state.pokemons)
    this.setState({ pokemons, pokemonsOrig: pokemons, total: pokemons.length })
  }

  // filter the pokemon to get only the fav ones
  formatFavourites(pokemons) {
    console.log('formatFavourites reached... ')
    let { favourites } = this.state

    pokemons = pokemons.filter((ele) => {
      return (favourites.indexOf(ele.id) > -1)
    })

    console.log("Fav pokemons are ", pokemons)
    return pokemons
  }

  // when the star on the fav panel is clicked remove the pokemon from the fav
  changeRating(event) {
    let { id } = event.target
    id = parseInt(id)

    let { favourites } = this.props
    let index = favourites.indexOf(id)

    if (index > -1) {
      favourites.splice(index, 1)
    }

    this.setState({ favourites }, () => {
      let pokemons = this.formatFavourites(this.state.pokemons)
      this.setState({ pokemons, pokemonsOrig: pokemons })
    })
    this.props.changeRating(favourites)
  }

  render() {

    let { pokemons, startIndex, searchResults, total, showLoading, showNoResult, noResultText, favourites } = this.state
    pokemons = pokemons.slice(startIndex, startIndex + this.allConstants.PERMISSIBLE_PAGINATION_LIMIT)

    let showRightButton = true
    if ((startIndex + this.allConstants.PERMISSIBLE_PAGINATION_LIMIT + 1) > total) {
      showRightButton = false
    } else if (searchResults == true && (pokemons.length < this.allConstants.PERMISSIBLE_PAGINATION_LIMIT)) {
      showRightButton = false
    }


    return (
      <div className="pokemon-panel">
        {(startIndex != 0 && pokemons.length > 0) ? <Navigation updatePokemons={this.updatePokemons} position={"left"} /> : null}

        {
          (showNoResult == true) ? <NoResult msg={noResultText} />
            :
            pokemons.map((pokemon) => {
              return (
                <Pokemon key={pokemon.id} {...pokemon} favourites={favourites} changeRating={this.changeRating} />
              )
            })
        }
        {(showRightButton == true) ? <Navigation updatePokemons={this.updatePokemons} position={"right"} /> : null}
      </div>
    )
  }

}

export default FavouritePokemons;