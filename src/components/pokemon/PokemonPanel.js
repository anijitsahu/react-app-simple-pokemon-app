import React, { Component } from 'react';
import axios from 'axios'

// Components
import Navigation from './Navigation'
import Pokemon from './Pokemon'
import Loading from '../search/Loading'
import NoResult from './NoResult'

// Constants
import Constants from '../Constants'


class PokemonPanel extends Component {
  constructor(props) {
    super(props)

    // initialize Constants
    this.allConstants = new Constants()

    // initial state
    this.state = {
      pokemons: [],
      pokemonsOrig: [],
      startIndex: 0,
      total: 0,
      startOrig: 0,
      searchResults: false,
      showLoading: false,
      noResultText: "No match found",
      showNoResult: false,
      favourites: this.props.favourites
    }

    this.updatePokemons = this.updatePokemons.bind(this)
    this.changeRating = this.changeRating.bind(this)

  }

  componentDidMount() {
    this.getPokemons()
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.searchId && (nextProps.searchId !== this.props.searchId)) {
      console.log('New search text received... perform the search')
      this.searchAndFilterPokemons(nextProps.searchText)
    }

    if (nextProps.favId !== this.props.favId) {
      console.log("changed favourites")
      this.setState({ favourites: nextProps.favourites })
    }
  }

  // search / filter
  searchAndFilterPokemons(searchText) {
    console.log('Code reached', searchText)
    let pokemons = [...this.state.pokemonsOrig]

    pokemons = pokemons.filter((ele) => {
      return ele.name.includes(searchText) || ele.types.includes(searchText)
    })

    // if the pokemon is not present in the current state
    if (pokemons.length == 0) {
      this.getIndivPokemon(searchText)
    } else {
      this.setState({ pokemons, startIndex: 0, total: pokemons.length }, () => {
        console.log('Filtered pokemons are', this.state)
        if (searchText == "") {
          this.setState({ searchResults: false, showNoResult: false })
        } else {
          this.setState({ searchResults: true, showNoResult: false })
        }
      })
    }
  }

  // get indiv pokemon by name / type
  getIndivPokemon(searchText) {
    let { allConstants } = this
    this.setState({ showLoading: true })
    axios({
        method: allConstants.METHODS.GET,
        url: allConstants.POKEMON_INDIV_URL.replace('{id}', searchText),
        headers: allConstants.HEADER
      })
      .then((response) => {
        console.log('response for Search', response)
        this.setState({ searchResults: true, showLoading: false, showNoResult: false })
        this.formatPokemonInfo([response], false)
      })
      .catch((error) => {
        console.log('No match found', this.state)
        this.setState({ showNoResult: true, showLoading: false })
      })
  }

  // function to get the data from API
  getPokemons() {
    let promises = []
    let { allConstants } = this

    let { startIndex } = this.state

    this.setState({ showLoading: true })
    startIndex = startIndex + 1
    let endIndex = startIndex + allConstants.PERMISSIBLE_PAGINATION_LIMIT
    for (let i = startIndex; i <= endIndex; i++) {
      promises.push(
        axios({
          method: allConstants.METHODS.GET,
          url: allConstants.POKEMON_INDIV_URL.replace('{id}', i),
          headers: allConstants.HEADER
        })
      )
    }

    // promise call to get the data
    Promise.all(promises)
      .then((response) => {
        console.dir("response from API", response)
        this.formatPokemonInfo(response, true)
        this.setState({ showLoading: false })
      })
      .catch((error) => {
        console.error("Some error occurred", error)
      })
  }

  formatPokemonInfo(response, modifyOrig) {
    let pokemons = []
    response.forEach((ele, index) => {
      let { name, id, height, weight, stats, types } = ele.data

      // set pokemon types
      let pokemonTypes = ''
      if (types) {
        types.forEach((ele) => {
          pokemonTypes = `${pokemonTypes}, ${ele.type.name}`
        })
      }

      // remove the first comma
      pokemonTypes = pokemonTypes.replace(', ', '')

      // set the pokemon stats
      let pokemonStats = []
      if (stats) {
        stats.forEach((ele) => {
          pokemonStats.push({ name: ele.stat.name, rank: ele.base_stat })
        })
      }

      pokemons.push({
        name,
        id: (id) ? id : index,
        height,
        weight,
        types: pokemonTypes,
        stats: pokemonStats
      })
    })

    if (modifyOrig == true) {
      this.setState({
        pokemons: [...this.state.pokemons, ...pokemons],
        pokemonsOrig: [...this.state.pokemons, ...pokemons],
        total: pokemons[pokemons.length - 1].id
      }, () => {

        console.log('Send list to the Content ')
        this.props.updatePokemonsList(this.state.pokemonsOrig)
      })

    } else {
      this.setState({ pokemons, startIndex: 0, total: pokemons.length })
    }
  }

  updatePokemons(event) {
    let { id: type } = event.target

    let { startIndex, total, searchResults } = this.state
    console.log("Start and total are : ", startIndex, ' and ', total)

    if (type == "right") {
      this.setState({
        startIndex: startIndex + this.allConstants.PERMISSIBLE_PAGINATION_LIMIT + 1,
      }, () => {
        console.log('State is updated', this.state)

        // if it reaches at the end load more pokemons
        if (searchResults == false && (this.state.startIndex + this.allConstants.PERMISSIBLE_PAGINATION_LIMIT > total)) {
          this.getPokemons()
        }
      })
    } else {
      this.setState({
        startIndex: ((startIndex - this.allConstants.PERMISSIBLE_PAGINATION_LIMIT) < 0) ? 0 : startIndex - this.allConstants.PERMISSIBLE_PAGINATION_LIMIT - 1,
      }, () => {
        console.log('State is updated', this.state)
      })
    }
  }

  changeRating(event) {
    let { id } = event.target
    let { favourites, changeRating } = this.props
    id = parseInt(id)
    console.log('Rating to be changed for', id)
    let index = favourites.indexOf(id)
    if (index > -1) {
      favourites.splice(index, 1)
      changeRating(favourites)
    } else {
      favourites.push(parseInt(id))
      changeRating(favourites)
    }
  }

  // render 
  render() {
    let { pokemons, startIndex, searchResults, total, showLoading, showNoResult, noResultText, favourites } = this.state
    pokemons = pokemons.slice(startIndex, startIndex + this.allConstants.PERMISSIBLE_PAGINATION_LIMIT)
    let showRightButton = false

    // condition to show the right button
    if (searchResults == false && pokemons.length > 0) {
      showRightButton = true
    } else if (searchResults == true && ((this.state.startIndex + this.allConstants.PERMISSIBLE_PAGINATION_LIMIT + 1) <= total)) {
      showRightButton = true
    }

    if (showNoResult == true) {
      showRightButton = false
    }

    return (
      <div className="pokemon-panel">
        {(startIndex != 0 && pokemons.length > 0) ? <Navigation updatePokemons={this.updatePokemons} position={"left"} /> : null}
        {
          (showLoading == true) ? <Loading />
            :
            (showNoResult == true) ? <NoResult msg={noResultText}/> 
            :
              pokemons.map((pokemon) => {
                return (
                  <Pokemon key={pokemon.id} {...pokemon} favourites={favourites} changeRating={this.changeRating}/>
                )
              })
        }
        {(showRightButton == true) ? <Navigation updatePokemons={this.updatePokemons} position={"right"} /> : null}
      </div>
    );
  }
}


export default PokemonPanel;