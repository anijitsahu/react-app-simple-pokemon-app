import React, { Component } from 'react';
import axios from 'axios'

// Components
import Navigation from './Navigation'
import Pokemon from './Pokemon'

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
		}

		this.updatePokemons = this.updatePokemons.bind(this)

	}

	componentDidMount() {
		this.getPokemons()
	}

	componentWillReceiveProps(nextProps) {

		if (nextProps.searchId && (nextProps.searchId !== this.props.searchId)) {
			console.log('New search text received... perform the search')
			this.searchAndFilterPokemons(nextProps.searchText)
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
			})
		}
	}

	// get indiv pokemon by name / type
	getIndivPokemon(searchText) {
		let { allConstants } = this

		axios({
			method: allConstants.METHODS.GET,
			url: allConstants.POKEMON_INDIV_URL.replace('{id}', searchText),
			headers: allConstants.HEADER
		})
			.then((response) => {
				console.log('response for Search', response)
				this.formatPokemonInfo([response], false)
			})
			.catch((error) => {
				console.error("some error occurred", error)
				console.log('No match found')
			})
	}

	// function to get the data from API
	getPokemons() {
		let promises = []
		let { allConstants } = this

		let { startIndex } = this.state
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
			this.setState((prevState) => ({
				pokemons: [...prevState.pokemons, ...pokemons],
				pokemonsOrig: [...prevState.pokemons, ...pokemons],
				total: pokemons[pokemons.length - 1].id
			}))

		} else {
			this.setState({ pokemons, startIndex: 0, total: pokemons.length })
		}
	}

	updatePokemons(event) {
		let { id: type } = event.target

		let { startIndex, total } = this.state
		console.log("Start and total are : ", startIndex, ' and ', total)

		if (type == "right") {
			this.setState({
				startIndex: startIndex + this.allConstants.PERMISSIBLE_PAGINATION_LIMIT + 1,
			}, () => {
				console.log('State is updated', this.state)

				// if it reaches at the end load more pokemons
				if (this.state.startIndex + this.allConstants.PERMISSIBLE_PAGINATION_LIMIT > total) {
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

	// render 
	render() {
		let { pokemons, startIndex } = this.state
		pokemons = pokemons.slice(startIndex, startIndex + this.allConstants.PERMISSIBLE_PAGINATION_LIMIT)
		return (
			<div className="pokemon-panel">
				{(startIndex != 0 && pokemons.length > 0) ? <Navigation updatePokemons={this.updatePokemons} position={"left"} /> : null}

				{
					pokemons.map((pokemon) => {
						return (
							<Pokemon key={pokemon.id} {...pokemon} />
						)
					})
				}
				{(pokemons.length > 0) ? <Navigation updatePokemons={this.updatePokemons} position={"right"} /> : null}
			</div>
		);
	}
}


export default PokemonPanel;